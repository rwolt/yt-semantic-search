import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  transcripts: defineTable({
    collectionId: v.union(v.id('collections'), v.literal('all')),
    videoId: v.string(),
    videoTitle: v.optional(v.string()),
    videoChannelName: v.optional(v.string()),
    videoUploadDate: v.optional(v.string()),
    offset: v.number(),
    text: v.string(),
    tag: v.string(),
    embedding: v.array(v.float64()),
  }).vectorIndex('by_embedding', {
    vectorField: 'embedding',
    dimensions: 1536,
    filterFields: ['tag', 'collectionId'],
  }),
  chats: defineTable({
    owner: v.string(),
  }),
  messages: defineTable({
    chatId: v.string(),
    text: v.string(),
    role: v.union(v.literal('user'), v.literal('assistant')),
  }),
  collections: defineTable({
    name: v.string(),
    owner: v.string(),
  }),
});
