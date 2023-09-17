import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import { ChatInput } from "./ChatInput";

export const Chat = () => {
  const chatResponse = useQuery(api.message.get);
  return (
    <div className="w-auto bg-slate-300 h-[calc(100vh-61px)] p-2 mr-4 relative">
      <h2 className="text-lg">Chat</h2>
      <div className="overflow-scroll pb-40px">{chatResponse?.text}</div>
      <ChatInput />
    </div>
  );
};
