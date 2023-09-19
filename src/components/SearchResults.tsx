import { SearchResult } from './Search';
import { SearchResultCard } from './SearchResultCard';

type SearchResultProps = {
  searchResults: SearchResult[];
};
export const SearchResults = ({ searchResults }: SearchResultProps) => {
  return (
    <div className="w-100 grid grid-cols-1 gap-2 h-[calc(100vh-68px-392px-72px)] overflow-auto ">
      {searchResults?.map((result) => {
        return <SearchResultCard key={result._id} result={result} />;
      })}
    </div>
  );
};
