import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { api } from './_generated/api';

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
      v.object({ videoUrl: v.string(), offset: v.number(), text: v.string() })
    ),
  },
  handler: async (ctx, { chunks }) => {
    await Promise.all(
      chunks.map(async (chunk) => {
        const { videoUrl, offset, text } = chunk;
        await ctx.db.insert('transcripts', { videoUrl, offset, text });
      })
    );
  },
});
