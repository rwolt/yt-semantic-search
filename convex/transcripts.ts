import { api } from './_generated/api';
import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { Id } from './_generated/dataModel';

type Collection = {
  _id: Id<'collections'>;
  _creationTime: number;
  name: string;
  owner: string;
};

export type Transcript = {
  _id: Id<'transcripts'>;
  _creationTime: number;
  collectionId: Id<'collections'> | 'all';
  videoId: string;
  videoTitle?: string | undefined;
  videoChannelName?: string | undefined;
  videoUploadDate?: string | undefined;
  offset: number;
  text: string;
  tag: string;
  embedding: number[];
};

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('transcripts').collect();
  },
});

export const post = mutation({
  args: {
    videoUrl: v.string(),
    collectionId: v.union(v.id('collections'), v.literal('all')),
  },
  handler: async (ctx, { videoUrl, collectionId }) => {
    await ctx.scheduler.runAfter(0, api.text.fetch, { videoUrl, collectionId });
  },
});

export const postChunks = mutation({
  args: {
    chunks: v.array(
      v.object({
        collectionId: v.union(v.id('collections'), v.literal('all')),
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
    console.log('posting chunks with embeddings...');
    // const { tokenIdentifier } = await ctx.auth.getUserIdentity();
    // console.log("Token Identifier: " + tokenIdentifier);
    await Promise.all(
      chunks.map(async (chunk) => {
        const {
          collectionId,
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
          collectionId,
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
  args: {
    query: v.string(),
    filterTag: v.string(),
    collectionId: v.union(v.id('collections'), v.literal('all')),
  },
  handler: async (ctx, args) => {
    await ctx.scheduler.runAfter(0, api.openai.similarTranscripts, {
      descriptionQuery: args.query,
      filterTag: args.filterTag,
      collectionId: args.collectionId,
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

export const getTags = query({
  args: {
    collectionId: v.union(v.id('collections'), v.literal('all')),
    userId: v.optional(v.string()),
  },
  handler: async (ctx, { collectionId, userId }) => {
    let docs: Transcript[];
    if (collectionId === 'all') {
      const collections = await ctx.db
        .query('collections')
        .filter((q) => q.eq(q.field('owner'), userId))
        .collect();

      const collectionIds = collections.map((collection) => collection._id);

      const collectionDocsPromises = collectionIds.map(async (collectionId) => {
        const collectionDocs: Transcript[] = await ctx.db
          .query('transcripts')
          .filter((q) => q.eq(q.field('collectionId'), collectionId))
          .collect();
        return collectionDocs;
      });

      const collectionDocsArray = await Promise.all(collectionDocsPromises);
      docs = collectionDocsArray.flat();
    } else {
      docs = await ctx.db
        .query('transcripts')
        .filter((q) => q.eq(q.field('collectionId'), collectionId))
        .order('desc')
        .collect();
    }
    const uniqueTags: string[] = [];
    docs.forEach((doc) => {
      if (doc.tag !== undefined && uniqueTags.indexOf(doc.tag) === -1) {
        uniqueTags.push(doc.tag);
      }
    });
    return uniqueTags;
  },
});
