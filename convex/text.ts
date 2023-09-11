'use node';
import { YoutubeTranscript } from 'youtube-transcript';
import { v } from 'convex/values';
import { action } from './_generated/server';
import { api } from './_generated/api';

export const fetch = action({
  args: { videoUrl: v.string() },
  handler: async (ctx, { videoUrl }) => {
    const rawTranscript = await YoutubeTranscript.fetchTranscript(videoUrl);
    console.log('fetched transcript');
    await ctx.scheduler.runAfter(0, api.text.combineAndSplit, {
      videoUrl,
      transcript: rawTranscript,
      maxCharacters: 3000,
      overlapPercentage: 10,
    });
  },
});

export const combineAndSplit = action({
  args: {
    videoUrl: v.string(),
    transcript: v.array(
      v.object({ text: v.string(), duration: v.number(), offset: v.number() })
    ),
    maxCharacters: v.number(),
    overlapPercentage: v.number(),
  },
  handler: async (
    ctx,
    { videoUrl, transcript, maxCharacters, overlapPercentage }
  ) => {
    const chunks = [];
    let currentChunk;
    let overlappingChunk;

    const overlapLength = maxCharacters * (overlapPercentage / 100);

    for (const entry of transcript) {
      if (!currentChunk) {
        currentChunk = { videoUrl, offset: entry.offset, text: entry.text };
      } else if (currentChunk.text.length < maxCharacters - overlapLength) {
        currentChunk.text += entry.text + ' ';
      } else if (currentChunk.text.length < maxCharacters) {
        if (!overlappingChunk) {
          overlappingChunk = {
            videoUrl,
            offset: entry.offset,
            text: entry.text,
          };
        } else {
          currentChunk.text += entry.text + ' ';
          overlappingChunk.text += entry.text + ' ';
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
    console.log(chunks.length);
    console.log(chunks);

    await ctx.runMutation(api.transcripts.postChunks, { chunks });
  },
});
