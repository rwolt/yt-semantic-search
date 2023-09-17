import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { OpenAI } from "openai";
import { generateTagsSystemMessage, searchResponsePrompt } from "./prompts";
import { Doc } from "./_generated/dataModel";
import { Id } from "./_generated/dataModel";

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
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: `${generateTagsSystemMessage}` },
        { role: "user", content: JSON.stringify(chunks.slice(0, 4)) },
      ],
      model: "gpt-3.5-turbo",
    });
    const tag = completion.choices[0].message.content || "";
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
          model: "text-embedding-ada-002",
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
    filterTag: v.string(),
  },
  handler: async (ctx, { descriptionQuery, filterTag }) => {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: descriptionQuery,
    });
    const queryEmbedding = response.data[0].embedding;
    // Search for similar transcripts
    //
    let results: {
      _id: Id<"transcripts">;
      _score: number;
    }[] = [];

    if (filterTag === "none") {
      results = await ctx.vectorSearch("transcripts", "by_embedding", {
        vector: queryEmbedding,
        limit: 16,
      });
    } else {
      results = await ctx.vectorSearch("transcripts", "by_embedding", {
        vector: queryEmbedding,
        limit: 16,
        filter: (q) => q.eq("tag", filterTag),
      });
      // Fetch the results
      const transcripts: Array<Doc<"transcripts">> = await ctx.runQuery(
        api.transcripts.fetchResults,
        {
          ids: results.map((result) => result._id),
        }
      );
      const transcriptsWithScores = transcripts.map((transcript, idx) => {
        const { embedding, _creationTime, ...rest } = transcript;
        return { ...rest, score: results[idx]._score };
      });

      await ctx.scheduler.runAfter(0, api.openai.chatResponse, {
        query: descriptionQuery,
        docs: transcriptsWithScores.slice(0, 3),
      });
      return transcriptsWithScores;
    }
  },
});

export const chatResponse = action({
  args: {
    query: v.string(),
    docs: v.array(
      v.object({
        _id: v.id("transcripts"),
        videoId: v.string(),
        videoTitle: v.optional(v.string()),
        videoChannelName: v.optional(v.string()),
        videoUploadDate: v.optional(v.string()),
        offset: v.number(),
        text: v.string(),
        tag: v.string(),
        score: v.number(),
      })
    ),
  },
  handler: async (ctx, { query, docs }) => {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: `${searchResponsePrompt}` },
        { role: "user", content: JSON.stringify(docs) + query },
      ],
      model: "gpt-3.5-turbo",
    });
    const messageText = completion.choices[0].message.content;
    console.log(messageText);
    if (typeof messageText === "string") {
      await ctx.runMutation(api.message.post, { text: messageText });
    }
  },
});
