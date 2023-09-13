import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  transcripts: defineTable({
    videoId: v.string(),
    videoTitle: v.optional(v.string()),
    videoChannelName: v.optional(v.string()),
    videoUploadDate: v.optional(v.string()),
    offset: v.number(),
    text: v.string(),
  }),
});

//   .vectorIndex("by_embedding", {
//     vectorField: "embedding",
//     dimensions: 1536,
//   }),
// });
