import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const post = mutation({
  args: {
    chatId: v.string(),
    text: v.string(),
    role: v.union(v.literal('user'), v.literal('assistant')),
  },
  handler: async (ctx, { role, text, chatId }) => {
    await ctx.db.insert('messages', {
      chatId,
      role,
      text,
    });
  },
});

export const getChatHistory = query({
  args: {
    chatId: v.string(),
  },
  handler: async (ctx, { chatId }) => {
    console.log(chatId);
    const history = await ctx.db
      .query('messages')
      .filter((q) => q.eq(q.field('chatId'), chatId))
      .order('asc')
      .collect();
    console.log(history);
    return history;
  },
});
