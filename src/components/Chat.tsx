import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import { ChatInput } from "./ChatInput";

export const Chat = () => {
  const chatResponse = useQuery(api.message.get);
  return (
    <div className="w-auto bg-slate-300 min-h-full max-h-full  p-2 mr-4 relative">
      <h2 className="text-lg">Chat</h2>
      {chatResponse?.text}
      <ChatInput />
    </div>
  );
};
