import { api } from '../../convex/_generated/api';
import { useQuery } from 'convex/react';
import { ChatInput } from './ChatInput';

export const Chat = () => {
  const chatResponse = useQuery(api.message.get);
  return (
    <div className="bg-slate-300 h-[calc(100vh-65px)] p-6 pt-4 mx-4 mr-8  relative grow">
      <h2 className="text-2xl">Chat</h2>
      <div className="overflow-auto pb-40px mt-2">{chatResponse?.text}</div>
      <ChatInput />
    </div>
  );
};
