import { useAction } from "convex/react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";
import { SearchBox } from "./SearchBox";
import { SearchResults } from "./SearchResults";

export type SearchResult = {
  _id: string;
  score: number;
  videoTitle?: string;
  videoChannelName?: string;
  videoUploadDate?: string;
  text: string;
  videoId: string;
  offset: number;
  tag: string;
};

export const Search = () => {
  const search = useAction(api.openai.similarTranscripts);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const handleSearch = async (query: string, filter: string) => {
    const results = await search({
      descriptionQuery: query,
      filterTag: filter,
    });
    setSearchResults(results);
  };
  return (
    <div>
      <SearchBox handleSearch={handleSearch} />
      <SearchResults searchResults={searchResults} />
    </div>
  );
};
