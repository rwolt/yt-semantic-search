import { Preview } from "./Preview";
import { Search } from "./Search";
export const Main = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="h-1/2">
        <Preview />
      </div>
      <Search />
    </div>
  );
};
