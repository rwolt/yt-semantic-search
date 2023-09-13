import { api } from '../../convex/_generated/api';
import { useAction } from 'convex/react';
import { useState } from 'react';

interface SearchResult {
  score: number;
  videoTitle?: string;
  videoChannelName?: string;
  videoUploadDate?: string;
  text: string;
  videoId: string;
  offset: number;
  tag: string;
  embedding: number[];
}

export const SearchBox = () => {
  const search = useAction(api.openai.similarTranscripts);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setQuery('');
    const results = await search({ descriptionQuery: query });
    setSearchResults(results);
    // setResults(similar);
    // console.log(results);
  };

  return (
    <div>
      <form className="flex flex-row align-center">
        <label htmlFor="search" className="flex flex-col justify-center mr-2">
          <p>Search Knowledge Base:</p>
        </label>
        <input
          className="border-black border-2 rounded-xl px-3 py-1 w-1/2"
          type="text"
          id="search"
          name="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
        <button
          className="bg-slate-600 text-white px-4 py-2 rounded-lg ml-2"
          onClick={(e) => handleClick(e)}
        >
          Search
        </button>
      </form>
      {searchResults?.map((result) => {
        return (
          <div className="p-2 mb-3">
            <a
              href={`https://youtube.com/watch?v=${result.videoId}&t=${result.offset}`}
            >
              Link to Timecode
            </a>
            <p>Score: {result.score}</p>
            <p>Video Title: {result.videoTitle}</p>
            <p>Video Channel: {result.videoChannelName}</p>
            <p>Transcript Text: {result.text}</p>
          </div>
        );
      })}
    </div>
  );
};
