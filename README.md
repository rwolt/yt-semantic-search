# Youtube Semantic Search / Natural Language Chat

## TODO:

- [x] Fetch video transcript using youtube-transcript
- [x] Use helper script to split transcript into ~600 token chunks
- [x] Generate embeddings for each chunk and add to vector store
- [x] Add logic for vector search using embedding generated from user query
- [x] Prompt OpenAI Chat API using JSON formatted transcripts and user query as context

## Getting source citations in response

The method used for obtaining a chat response with source citations involves providing the language model with transcript chunks formatted as JSON. The model is prompted to respond in a specific JSON format that can later be destructured and correctly formatted for the client application.

```json
[
  {
    "role": "system",
    "content": "You are a helpful assistant that uses the provided video transcripts to answer questions. Only respond in the JSON format within --- ...."
  },
   ...Chat message history goes here
  {
    "role": "user",
    "text": "When is the next starship test flight?",
    "context": [
      {
        "videoId": "vid01",
        "videoChannelName": "Video 1 Channel Name",
        "offsetMs": 3428,
        "text": "this is the first chunk of transcript text..."
      },
      {
        "videoId": "vid02",
        "videoChannelName": "Video 2 Channel Name",
        "offsetMs": 151095,
        "text": "this is the second chunk of transcript text..."
      },
      {
        "videoId": "vid01",
        "videoChannelName": "Video 1 Channel Name",
        "offsetMs": 18529,
        "text": "this is the third chunk of transcript text..."
      }
    ]
  },
  {
    "role": "assistant",
    "content": {
      "response": {
        "text": [
          {
            "content": {
              "text": "This is the first statement...",
              "source": {
                "offsetMs": 18529,
                "videoId": "vid01"
              }
            }
          },
          {
            "content": {
              "text": "This is the second statement...",
              "source": {
                "offsetMs": 151095,
                "videoId": "vid02"
              }
            }
          },
          {
            "content": {
              "text": "This is the third statement...",
              "source": {
                "offsetMs": 3428,
                "videoId": "vid01"
              }
            }
          }
        ]
      }
    }
  }
]
```
