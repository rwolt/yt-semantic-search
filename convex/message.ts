import { v } from 'convex/values';
import { api } from './_generated/api';
import { mutation, query } from './_generated/server';

export const post = mutation({
  args: {
    collectionId: v.union(v.id('collections'), v.literal('all')),
    chatId: v.string(),
    text: v.string(),
    role: v.union(v.literal('user'), v.literal('assistant')),
  },
  handler: async (ctx, { role, text, chatId, collectionId }) => {
    if (role === 'user') {
      await ctx.db.insert('messages', {
        chatId,
        role,
        text,
      });
      await ctx.scheduler.runAfter(0, api.openai.chatResponse, {
        collectionId,
        chatId,
        query: text,
      });
    }
    if (role === 'assistant') {
      await ctx.db.insert('messages', {
        chatId,
        role,
        text,
      });
    }
  },
});

export const getChatHistory = query({
  args: {
    chatId: v.string(),
  },
  handler: async (ctx, { chatId }) => {
    const history = await ctx.db
      .query('messages')
      .filter((q) => q.eq(q.field('chatId'), chatId))
      .order('asc')
      .collect();
    return history;
  },
});
