import { api } from './_generated/api';
import { v } from 'convex/values';
import { internalQuery, mutation, query } from './_generated/server';

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('transcripts').collect();
  },
});

export const post = mutation({
  args: { videoUrl: v.string() },
  handler: async (ctx, { videoUrl }) => {
    await ctx.scheduler.runAfter(0, api.text.fetch, { videoUrl });
  },
});

export const postChunks = mutation({
  args: {
    chunks: v.array(
      v.object({
        videoId: v.string(),
        videoTitle: v.optional(v.string()),
        videoChannelName: v.optional(v.string()),
        videoUploadDate: v.optional(v.string()),
        offset: v.number(),
        text: v.string(),
        tag: v.string(),
        embedding: v.array(v.float64()),
      })
    ),
  },
  handler: async (ctx, { chunks }) => {
    await Promise.all(
      chunks.map(async (chunk) => {
        const {
          videoId,
          videoTitle,
          videoChannelName,
          videoUploadDate,
          offset,
          text,
          tag,
          embedding,
        } = chunk;
        await ctx.db.insert('transcripts', {
          videoId,
          videoTitle,
          videoChannelName,
          videoUploadDate,
          offset,
          text,
          tag,
          embedding,
        });
      })
    );
  },
});

export const getSimilar = mutation({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    await ctx.scheduler.runAfter(0, api.openai.similarTranscripts, {
      descriptionQuery: args.query,
    });
  },
});

export const fetchResults = query({
  args: {
    ids: v.array(v.id('transcripts')),
  },
  handler: async (ctx, args) => {
    const results = [];
    for (const id of args.ids) {
      const doc = await ctx.db.get(id);
      if (doc === null) {
        continue;
      }
      results.push(doc);
    }
    return results;
  },
});
