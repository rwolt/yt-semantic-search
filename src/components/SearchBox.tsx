import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';
import { useUser } from '@clerk/clerk-react';
import { useCollectionContext } from '../CollectionContext';

type SearchBoxProps = {
  collectionId: Id<'collections'> | 'all';
  handleSearch: (
    query: string,
    filter: string | undefined,
    collectionId: Id<'collections'> | 'all'
  ) => Promise<void>;
};

export const SearchBox = ({ collectionId, handleSearch }: SearchBoxProps) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const { user } = useUser();
  const { collectionInfo } = useCollectionContext();
  const tags = useQuery(api.transcripts.getTags, {
    userId: user?.id,
    collectionId: collectionInfo.id,
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    handleSearch(query, filter, collectionId);
    setQuery('');
  };
  return (
    <div>
      <form className="flex flex-row align-center py-4 justify-between rounded-full">
        {/* <label
          htmlFor="search"
          className="flex flex-col justify-center mr-2"
        ></label> */}
        <input
          className="border-black border-2 text-black px-3 py-1 w-1/2 rounded-md grow"
          placeholder="Search"
          type="text"
          id="search"
          name="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
        <div className="flex grow">
          <label
            htmlFor="searchFilter"
            className="flex flex-col justify-center ml-4 mr-2"
          >
            Filter:{' '}
          </label>
          <select
            className="border-black text-black border-2 rounded-md px-3 py-1 grow"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">None</option>
            {tags?.map((tag) => {
              return (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="bg-slate-600 text-white px-6 py-2 rounded-md ml-2"
          onClick={(e) => handleClick(e)}
        >
          Go
        </button>
      </form>
    </div>
  );
};
