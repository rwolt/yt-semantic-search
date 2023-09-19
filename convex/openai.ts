import { v } from 'convex/values';
import { action } from './_generated/server';
import { api } from './_generated/api';
import { OpenAI } from 'openai';
import { generateTagsSystemMessage, searchResponsePrompt } from './prompts';
import { Doc } from './_generated/dataModel';
import { ChatCompletionMessageParam } from 'openai/resources/chat';
// import { Id } from './_generated/dataModel';
// import { Collection } from './collection';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateTags = action({
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
      })
    ),
  },
  handler: async (ctx, { chunks }) => {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: `${generateTagsSystemMessage}` },
        { role: 'user', content: JSON.stringify(chunks.slice(0, 2)) },
      ],
      model: 'gpt-3.5-turbo',
    });
    const tag = completion.choices[0].message.content || '';
    console.log('generated tag: ', tag);
    const taggedChunks = chunks.map((chunk) => {
      return { ...chunk, tag: tag };
    });
    console.log('tagged the chunks. chunks length: ', taggedChunks.length);
    await ctx.scheduler.runAfter(0, api.openai.generateEmbeddings, {
      chunks: taggedChunks,
    });
  },
});

export const generateEmbeddings = action({
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
      })
    ),
  },
  handler: async (ctx, { chunks }) => {
    console.log('generating embeddings...\n');
    const allTexts = chunks.map((chunk) => chunk.text);
    console.log(allTexts.slice(0, 2));
    try {
      const response = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: allTexts,
      });
      const embeddings = response.data.map((item) => item.embedding);

      // Combine embeddings with chunks
      const chunksWithEmbeddings = chunks.map((chunk, index) => {
        return { ...chunk, embedding: embeddings[index] };
      });

      console.log('calling post chunks mutation');
      await ctx.runMutation(api.transcripts.postChunks, {
        chunks: chunksWithEmbeddings,
      });
    } catch (error) {
      console.error('Error processsing embeddings: ', error);
    }
  },
});

export const similarTranscripts = action({
  args: {
    collectionId: v.union(v.id('collections'), v.literal('all')),
    descriptionQuery: v.string(),
    filterTag: v.optional(v.string()),
  },
  handler: async (ctx, { descriptionQuery, filterTag, collectionId }) => {
    // const identity = await ctx.auth.getUserIdentity();
    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: descriptionQuery,
    });
    const queryEmbedding = response.data[0].embedding;
    // TODO: Index transcripts table by collection owner
    //
    // const userCollectionIds: Id<'collections'>[] | Id<'collections'> = await ctx
    //   .runQuery(api.collection.getUserCollections, {
    //     userId: identity?.tokenIdentifier,
    //   })
    //   .then((collections: Collection[]) =>
    //     collections.map((collection) => collection._id)
    //   );

    const results = await ctx.vectorSearch('transcripts', 'by_embedding', {
      vector: queryEmbedding,
      limit: 8,
      ...(collectionId !== 'all' && {
        filter: (q) => q.eq('collectionId', collectionId),
      }),
      ...(filterTag && {
        filter: (q) => q.eq('tag', filterTag),
      }),
    });

    // Fetch the results
    const transcripts: Array<Doc<'transcripts'>> = await ctx.runQuery(
      api.transcripts.fetchResults,
      {
        ids: results.map((result) => result._id),
      }
    );
    const transcriptsWithScores = transcripts.map((transcript, idx) => {
      const { videoId, offset, videoChannelName, videoTitle, text } =
        transcript;
      return {
        videoId,
        text,
        offset,
        videoChannelName,
        videoTitle,
        score: results[idx]._score,
      };
    });

    return transcriptsWithScores;
  },
});

export const chatResponse = action({
  args: {
    collectionId: v.union(v.id('collections'), v.literal('all')),
    chatId: v.string(),
    query: v.string(),
  },

  handler: async (ctx, { query, collectionId, chatId }) => {
    console.log('generating chat response...');
    const transcripts = await ctx.runAction(api.openai.similarTranscripts, {
      collectionId,
      descriptionQuery: query,
    });

    // Get the first 3 transcripts to hand off to chatGPT
    const contextDocs = transcripts
      .map((transcript) => {
        const { videoId, videoChannelName, offset, text } = transcript;
        return { videoId, videoChannelName, offset, text };
      })
      .slice(0, 4);

    const messages: ChatCompletionMessageParam[] = [
      { role: 'system', content: `${searchResponsePrompt}` },
      {
        role: 'user',
        content: JSON.stringify({
          Context: JSON.stringify(contextDocs),
          text: query,
        }),
      },
    ];
    const completion = await openai.chat.completions.create({
      messages: messages,
      model: 'gpt-3.5-turbo',
    });

    const messageText = completion.choices[0].message.content;
    console.log(messageText);

    if (typeof messageText === 'string') {
      await ctx.runMutation(api.message.post, {
        role: 'assistant',
        text: messageText,
        chatId: chatId,
        collectionId,
      });
    }
  },
});
