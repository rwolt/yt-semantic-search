import { SearchResult } from './Search';
import { SearchResultCard } from './SearchResultCard';

type SearchResultProps = {
  searchResults: SearchResult[];
};
export const SearchResults = ({ searchResults }: SearchResultProps) => {
  return (
    <div className="w-100 flex flex-col text-white h-[calc(100vh-68px-392px-100px)] overflow-auto justify-items-start ">
      {searchResults?.map((result) => {
        return <SearchResultCard key={result._id} result={result} />;
      })}
    </div>
  );
};
