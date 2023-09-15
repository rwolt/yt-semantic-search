import { useState } from "react";

type SearchBoxProps = {
  handleSearch: (query: string) => Promise<void>;
};

export const SearchBox = ({ handleSearch }: SearchBoxProps) => {
  const [query, setQuery] = useState("");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    handleSearch(query);
    setQuery("");
  };
  return (
    <div>
      <form className="flex flex-row align-center m-2 px-2">
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
        <label
          htmlFor="searchFilter"
          className="flex flex-col justify-center ml-4 mr-2"
        >
          Filter:{" "}
        </label>
        <select className="border-black border-2 rounded-xl px-3 py-1 ">
          <option>Tech</option>
        </select>
      </form>
    </div>
  );
};
