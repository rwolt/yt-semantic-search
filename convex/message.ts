import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const post = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert('messages', {
      text: args.text,
    });
  },
});

export const get = query({
  handler: async (ctx) => {
    const newest = await ctx.db.query('messages').order('desc').take(1);
    return newest[0];
  },
});
