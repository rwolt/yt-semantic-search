import { Chat } from "./Chat";
import { Search } from "./Search";
import { VideoContainer } from "./VideoContainer";
export const Main = () => {
  return (
    <div className="flex flex-row w-4/5 ">
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
