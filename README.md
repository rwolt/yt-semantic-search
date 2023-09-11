# Youtube Semantic Search / Natural Language Chat

## TODO:

- [x] Fetch video transcript using youtube-transcript
- [x] Use helper script to split transcript into ~600 token chunks
- [ ] Generate embeddings for each chunk and add to vector store
- [ ] Add logic for vector search using embedding generated from user query
- [ ] Prompt OpenAI Chat API using JSON formatted transcripts and user query as context

## Getting source citations in response

Getting ChatGPT to cite its sources requires some prompt hacking/prompt engineering. It is not clear whether the model is aware of which documents it used to obtain its response, so it is necessary to be explicit. The method for obtaining source citations used involves providing the model with transcript chunks formatted in JSON and prompting the model to respond in a specific JSON format that can later be destructured and formatted as markup.

```json
[
  {
    "role": "system",
    "content": "You are a helpful assistant that uses the provided video transcripts to answer questions. Your responses should be in JSON format (provide format) and include a source citation for each statement."
  },
  {
    "role": "document",
    "content": {
      "id": "c1",
      "text": "This is the first chunk of video transcript...",
      "videoURL": "http://youtube.com/video1#t=00m00s"
    }
  },
  {
    "role": "document",
    "content": {
      "id": "c1",
      "text": "This is the second chunk of video transcript...",
      "videoURL": "http://youtube.com/video1#t=03m00s"
    }
  },
  {
    "role": "user",
    "content": "What information can you provide based on these videos?"
  },
  {
    "role": "assistant",
    "content": {
      "text": [
        {
          "id": "r1",
          "content": "This is the first statement...",
          "source": ""
        },
        {
          "id": "r2",
          "content": "This is the second statement...",
          "source": ""
        }
      ]
    }
  }
]
```
