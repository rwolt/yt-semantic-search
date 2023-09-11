"use node";
import { YoutubeTranscript } from "youtube-transcript";
import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";

export const fetch = action({
  args: { videoUrl: v.string() },
  handler: async (ctx, { videoUrl }) => {
    const rawTranscript = await YoutubeTranscript.fetchTranscript(videoUrl);
    console.log("fetched transcript");
    await ctx.scheduler.runAfter(0, api.text.combine, {
      transcript: rawTranscript,
    });
  },
});

export const combine = action({
  args: {
    transcript: v.array(
      v.object({ text: v.string(), duration: v.number(), offset: v.number() })
    ),
  },
  handler: async (ctx, { transcript }) => {
    const combinedText = transcript.reduce(
      (combinedText, current) => combinedText + " " + current.text,
      ""
    );
    console.log(combinedText.length);

    await ctx.scheduler.runAfter(0, api.text.split, {
      transcriptText: combinedText,
      chunkSize: 3000,
      overlapPercentage: 10,
    });
  },
});

export const split = action({
  args: {
    transcriptText: v.string(),
    chunkSize: v.number(),
    overlapPercentage: v.number(),
  },
  handler: async (ctx, { transcriptText, chunkSize, overlapPercentage }) => {
    const chunks = [];
    const overlapCharacterLength = chunkSize * (overlapPercentage / 100);
    let startIndex = 0;
    let endIndex = Math.min(chunkSize, transcriptText.length - startIndex);
    do {
      const chunk = transcriptText.slice(startIndex, endIndex);
      chunks.push(chunk);
      startIndex = endIndex - overlapCharacterLength;
      endIndex = Math.min(startIndex + chunkSize, transcriptText.length);
    } while (startIndex < transcriptText.length - overlapCharacterLength);

    console.log(chunks.length + " chunks");

    await ctx.runMutation(api.transcripts.postChunks, { chunks });
  },
});
