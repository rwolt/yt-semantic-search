import { api } from '../../convex/_generated/api';
import { useQuery } from 'convex/react';
import { ChatInput } from './ChatInput';

export const Chat = () => {
  const chatResponse = useQuery(api.message.get);
  return (
    <div className="bg-slate-300 h-[calc(100vh-61px)] p-2 mr-4 relative grow">
      <h2 className="text-lg">Chat</h2>
      <div className="overflow-auto pb-40px">{chatResponse?.text}</div>
      <ChatInput />
    </div>
  );
};
