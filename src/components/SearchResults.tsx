import { SearchResult } from "./Search";
import { SearchResultCard } from "./SearchResultCard";

type SearchResultProps = {
  searchResults: SearchResult[];
};
export const SearchResults = ({ searchResults }: SearchResultProps) => {
  return (
    <div className="w-100 grid grid-cols-4 gap-2 m-4 ">
      {searchResults?.map((result) => {
        return <SearchResultCard result={result} />;
      })}
    </div>
  );
};
