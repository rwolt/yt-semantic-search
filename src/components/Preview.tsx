import { Chat } from "./Chat";
import { VideoContainer } from "./VideoContainer";
export const Preview = () => {
  return (
    <div className="flex flex-row h-full">
      <VideoContainer />
      <Chat />
    </div>
  );
};
