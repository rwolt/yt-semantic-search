import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
export const Chat = () => {
  const chatResponse = useQuery(api.message.get);
  return (
    <div className="w-auto bg-slate-300 min-h-screen overflow-auto p-2 mr-4">
      <h2 className="text-lg">Chat</h2>
      {chatResponse?.text}
    </div>
  );
};
