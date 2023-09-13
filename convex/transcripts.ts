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
      v.object({
        videoId: v.string(),
        videoTitle: v.optional(v.string()),
        videoChannelName: v.optional(v.string()),
        videoUploadDate: v.optional(v.string()),
        offset: v.number(),
        text: v.string(),
        tag: v.string(),
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
        } = chunk;
        await ctx.db.insert('transcripts', {
          videoId,
          videoTitle,
          videoChannelName,
          videoUploadDate,
          offset,
          text,
          tag,
        });
      })
    );
  },
});
