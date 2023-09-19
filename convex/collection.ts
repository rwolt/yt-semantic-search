import { query, mutation } from './_generated/server';
import { v } from 'convex/values';
import { Id } from './_generated/dataModel';

export type Collection = {
  _id: Id<'collections'>;
  _creationTime: number;
  name: string;
  owner: string;
};

export const get = query({
  args: {
    collectionId: v.id('collections'),
  },
  handler: async (ctx, { collectionId }) => {
    const collection = await ctx.db.get(collectionId);
    return collection;
  },
});

export const getUserCollections = query({
  args: {
    userId: v.optional(v.string()),
  },
  handler: async (ctx, { userId }) => {
    const collections = await ctx.db
      .query('collections')
      .filter((q) => q.eq(q.field('owner'), userId))
      .order('desc')
      .collect();

    return collections;
  },
});

export const post = mutation({
  args: {
    name: v.string(),
    owner: v.string(),
  },
  handler: async (ctx, { name, owner }) => {
    await ctx.db.insert('collections', { name, owner });
  },
});
