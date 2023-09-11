import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("transcripts").collect();
  },
});

export const post = mutation({
  args: { videoUrl: v.string() },
  handler: async (ctx, { videoUrl }) => {
    await ctx.scheduler.runAfter(0, api.text.fetch, { videoUrl });
  },
});

export const postChunks = mutation({
  args: { chunks: v.array(v.string()) },
  handler: async (ctx, { chunks }) => {
    await chunks.map(async (chunk) => {
      await ctx.db.insert("transcripts", { text: chunk });
    });
  },
});
