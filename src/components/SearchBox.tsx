import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

type SearchBoxProps = {
  handleSearch: (query: string, filter: string | undefined) => Promise<void>;
};

export const SearchBox = ({ handleSearch }: SearchBoxProps) => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const tags = useQuery(api.transcripts.getTags);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    handleSearch(query, filter);
    setQuery("");
  };
  return (
    <div>
      <form className="flex flex-row align-center py-2 justify-between rounded-full">
        <label
          htmlFor="search"
          className="flex flex-col justify-center mr-2"
        ></label>
        <input
          className="border-black border-2  px-3 py-1 w-1/2 rounded-md grow"
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
            Filter:{" "}
          </label>
          <select
            className="border-black border-2 rounded-md px-3 py-1 grow"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="undefined">None</option>
            {tags?.map((tag) => {
              return <option value={tag}>{tag}</option>;
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
