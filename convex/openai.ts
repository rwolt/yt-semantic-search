import { v } from 'convex/values';
import { action } from './_generated/server';
import { api } from './_generated/api';
import { OpenAI } from 'openai';
import { generateTagsSystemMessage } from './prompts';
import { Doc } from './_generated/dataModel';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateTags = action({
  args: {
    chunks: v.array(
      v.object({
        videoId: v.string(),
        videoTitle: v.optional(v.string()),
        videoChannelName: v.optional(v.string()),
        videoUploadDate: v.optional(v.string()),
        offset: v.number(),
        text: v.string(),
      })
    ),
  },
  handler: async (ctx, { chunks }) => {
    console.log('hello openai');
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: `${generateTagsSystemMessage}` },
        { role: 'user', content: JSON.stringify(chunks.slice(0, 4)) },
      ],
      model: 'gpt-3.5-turbo',
    });
    const tag = completion.choices[0].message.content || '';
    const taggedChunks = chunks.map((chunk) => {
      return { ...chunk, tag: tag };
    });

    await ctx.scheduler.runAfter(0, api.openai.generateEmbeddings, {
      chunks: taggedChunks,
    });
  },
});

export const generateEmbeddings = action({
  args: {
    chunks: v.array(
      v.object({
        videoId: v.string(),
        videoTitle: v.optional(v.string()),
        videoChannelName: v.optional(v.string()),
        videoUploadDate: v.optional(v.string()),
        offset: v.number(),
        text: v.string(),
        tag: v.string(),
      })
    ),
  },
  handler: async (ctx, { chunks }) => {
    // const response = await openai.embeddings.create({
    //   model: 'text-embedding-ada-002',
    //   input: chunks[0].text,
    // });

    // console.log(response.data[0].embedding);
    const chunksWithEmbeddings = await Promise.all(
      chunks.map(async (chunk) => {
        const response = await openai.embeddings.create({
          model: 'text-embedding-ada-002',
          input: chunk.text,
        });
        const embedding = response.data[0].embedding;
        return { ...chunk, embedding };
      })
    );
    await ctx.runMutation(api.transcripts.postChunks, {
      chunks: chunksWithEmbeddings,
    });
  },
});

export const similarTranscripts = action({
  args: {
    descriptionQuery: v.string(),
  },
  handler: async (ctx, { descriptionQuery }) => {
    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: descriptionQuery,
    });
    const queryEmbedding = response.data[0].embedding;
    // Search for similar transcripts
    const results = await ctx.vectorSearch('transcripts', 'by_embedding', {
      vector: queryEmbedding,
      limit: 16,
    });
    // Fetch the results
    const transcripts: Array<Doc<'transcripts'>> = await ctx.runQuery(
      api.transcripts.fetchResults,
      {
        ids: results.map((result) => result._id),
      }
    );
    return transcripts.map((transcript, idx) => {
      return { ...transcript, score: results[idx]._score };
    });
  },
});
