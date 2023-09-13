import { query } from './_generated/server';

export const getTitles = query({
  args: {},
  handler: async (ctx) => {
    const docs = await ctx.db.query('transcripts').order('desc').collect();

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
