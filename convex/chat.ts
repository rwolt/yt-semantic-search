import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const create = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, { userId }) => {
    const newChat = await ctx.db.insert('chats', { owner: userId });
    return newChat;
  },
});
