import { useAction } from "convex/react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";
import { SearchBox } from "./SearchBox";
import { SearchResults } from "./SearchResults";
import { useCollectionContext } from "../CollectionContext";

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
  const { collectionInfo } = useCollectionContext();
  const handleSearch = async (query: string, filter: string | undefined) => {
    const results = await search({
      descriptionQuery: query,
      filterTag: filter,
      collectionId: collectionInfo.id,
    });
    setSearchResults(results);
  };
  return (
    <div>
      <SearchBox handleSearch={handleSearch} collectionId={collectionInfo.id} />
      <SearchResults searchResults={searchResults} />
    </div>
  );
};
