import { InputBox } from "./InputBox";
import { VideoList } from "./VideoList";

export const SideBar = () => {
  return (
    <div className="flex flex-col w-1/5 p-4 bg-slate-200 min-h-screen">
      <h2 className="text-lg">Knowledge Base</h2>
      <InputBox />
      <VideoList />
    </div>
  );
};
