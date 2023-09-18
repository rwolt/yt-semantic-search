import { v } from 'convex/values';
import { query } from './_generated/server';
import { Transcript } from './transcripts';

export const getTitles = query({
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

    type VideoTitle = {
      videoId: string;
      videoTitle: string;
      videoChannelName: string;
    };

    const uniqueTitles: string[] = [];
    const videoTitles: VideoTitle[] = docs
      .map((doc) => {
        if (doc.videoTitle && uniqueTitles.indexOf(doc.videoTitle) === -1) {
          uniqueTitles.push(doc.videoTitle);
          return {
            videoId: doc.videoId,
            videoTitle: doc.videoTitle,
            videoChannelName: doc.videoChannelName,
          };
        }
      })
      .filter((videoTitle) => videoTitle !== undefined) as VideoTitle[];
    return videoTitles;
  },
});
