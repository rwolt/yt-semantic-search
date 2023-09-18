import { Chat } from './Chat';
import { Search } from './Search';
import { VideoContainer } from './VideoContainer';
export const Main = () => {
  return (
    <div className="flex flex-row w-full ">
      <div className="flex flex-col mx-4 mt-4 p-4 ml-8">
        <VideoContainer />
        <Search />
      </div>
      <div className="w-full">
        <Chat />
      </div>
    </div>
  );
};
