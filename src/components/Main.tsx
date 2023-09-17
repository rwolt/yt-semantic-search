import { Chat } from "./Chat";
import { Preview } from "./Preview";
import { Search } from "./Search";
import { VideoContainer } from "./VideoContainer";
export const Main = () => {
  return (
    <div className="flex flex-row w-auto ">
      <div className="flex flex-col p-4">
        <VideoContainer />
        <Search />
      </div>
      <div>
        <Chat />
      </div>
    </div>
  );
};
