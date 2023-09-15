import { Preview } from "./Preview";
import { Search } from "./Search";
export const Main = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="min-h-[50vh]">
        <Preview />
      </div>
      <Search />
    </div>
  );
};
