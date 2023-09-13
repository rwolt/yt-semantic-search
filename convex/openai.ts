import { v } from 'convex/values';
import { action } from './_generated/server';
import { api } from './_generated/api';
import { OpenAI } from 'openai';
import { generateTagsSystemMessage } from './prompts';

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
    console.log('hello handler');
    const taggedChunks = await Promise.all(
      chunks.map(async (chunk) => {
        const completion = await openai.chat.completions.create({
          messages: [
            { role: 'system', content: `${generateTagsSystemMessage}` },
            { role: 'user', content: JSON.stringify(chunk) },
          ],
          model: 'gpt-3.5-turbo',
        });
        console.log(completion);
        const tag = completion.choices[0].message.content || '';
        return { ...chunk, tag: tag };
      })
    );
    console.log(taggedChunks);
    // TODO hand chunks off to openai embeddings API
    await ctx.runMutation(api.transcripts.postChunks, { chunks: taggedChunks });
  },
});
