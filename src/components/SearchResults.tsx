import { SearchResult } from "./Search";
import { SearchResultCard } from "./SearchResultCard";

type SearchResultProps = {
  searchResults: SearchResult[];
};
export const SearchResults = ({ searchResults }: SearchResultProps) => {
  return (
    <div className="w-100 flex flex-row flex-wrap">
      {searchResults?.map((result) => {
        return <SearchResultCard result={result} />;
      })}
    </div>
  );
};
