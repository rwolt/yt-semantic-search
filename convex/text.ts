"use node";
import { YoutubeTranscript } from "youtube-transcript";
import { Client } from "youtubei";
import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";

const youtube = new Client();

export const fetch = action({
  args: { videoUrl: v.string() },
  handler: async (ctx, { videoUrl }) => {
    const url = new URL(videoUrl);
    const videoId = url.searchParams.get("v");
    if (videoId) {
      const video = await youtube.getVideo(videoId);
      const videoTitle = await video?.title;
      const videoChannelName = await video?.channel.name;
      const videoUploadDate = await video?.uploadDate;

      const rawTranscript = await YoutubeTranscript.fetchTranscript(videoId);
      if (!rawTranscript) {
        throw new Error("Error fetching transcript");
      }
      await ctx.scheduler.runAfter(0, api.text.combineAndSplit, {
        videoId,
        videoTitle,
        videoChannelName,
        videoUploadDate,
        transcript: rawTranscript,
        maxCharacters: 3000,
        overlapPercentage: 10,
      });
    } else {
      throw new Error("Invalid video URL");
    }
  },
});

export const combineAndSplit = action({
  args: {
    videoId: v.string(),
    videoTitle: v.optional(v.string()),
    videoChannelName: v.optional(v.string()),
    videoUploadDate: v.optional(v.string()),
    transcript: v.array(
      v.object({ duration: v.number(), offset: v.number(), text: v.string() })
    ),
    maxCharacters: v.number(),
    overlapPercentage: v.number(),
  },
  handler: async (
    ctx,
    {
      videoId,
      videoTitle,
      videoChannelName,
      videoUploadDate,
      transcript,
      maxCharacters,
      overlapPercentage,
    }
  ) => {
    const chunks = [];
    let currentChunk;
    let overlappingChunk;
    const overlapLength = maxCharacters * (overlapPercentage / 100);

    for (const entry of transcript) {
      if (!currentChunk) {
        currentChunk = {
          videoId,
          videoTitle,
          videoChannelName,
          videoUploadDate,
          offset: entry.offset,
          text: entry.text,
        };
      } else if (currentChunk.text.length < maxCharacters - overlapLength) {
        currentChunk.text += entry.text + " ";
      } else if (currentChunk.text.length < maxCharacters) {
        if (!overlappingChunk) {
          overlappingChunk = {
            videoId,
            videoTitle,
            videoChannelName,
            videoUploadDate,
            offset: entry.offset,
            text: entry.text,
          };
        } else {
          currentChunk.text += entry.text + " ";
          overlappingChunk.text += entry.text + " ";
        }
      } else {
        chunks.push(currentChunk);
        currentChunk = overlappingChunk;
        overlappingChunk = null;
      }
    }

    if (currentChunk) {
      chunks.push(currentChunk);
    }
    await ctx.runMutation(api.transcripts.postChunks, { chunks });
    // TODO hand chunks off to openai embeddings API
  },
});
