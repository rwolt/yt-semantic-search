"use node";
import { YoutubeTranscript } from "youtube-transcript";
import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";

export const fetch = action({
  args: { videoUrl: v.string() },
  handler: async (ctx, { videoUrl }) => {
    const url = new URL(videoUrl);
    const videoId = url.searchParams.get("v");
    console.log(typeof videoId);
    console.log(videoId);
    if (videoId) {
      const rawTranscript = await YoutubeTranscript.fetchTranscript(videoId);
      await ctx.scheduler.runAfter(0, api.text.combineAndSplit, {
        videoId,
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
    transcript: v.array(
      v.object({ text: v.string(), duration: v.number(), offset: v.number() })
    ),
    maxCharacters: v.number(),
    overlapPercentage: v.number(),
  },
  handler: async (
    ctx,
    { videoId, transcript, maxCharacters, overlapPercentage }
  ) => {
    const chunks = [];
    let currentChunk;
    let overlappingChunk;
    const overlapLength = maxCharacters * (overlapPercentage / 100);
    console.log(transcript);

    for (const entry of transcript) {
      if (!currentChunk) {
        currentChunk = { videoId, offset: entry.offset, text: entry.text };
      } else if (currentChunk.text.length < maxCharacters - overlapLength) {
        currentChunk.text += entry.text + " ";
      } else if (currentChunk.text.length < maxCharacters) {
        if (!overlappingChunk) {
          overlappingChunk = {
            videoId,
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
