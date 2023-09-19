import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { api } from '../../convex/_generated/api';
import { useMutation } from 'convex/react';
import { useState } from 'react';

type ChatInputProps = {
  chatId: string;
};

export const ChatInput = ({ chatId }: ChatInputProps) => {
  const postMessage = useMutation(api.message.post);
  const [query, setQuery] = useState('');
  const handleChatQuery = (e: React.MouseEvent) => {
    e.preventDefault();
    postMessage({ role: 'user', text: query, chatId: chatId });
    setQuery('');
  };

  return (
    <form className="flex flex-row items-center border-gray-500 border absolute bottom-4 right-4 left-4 focus-within:outline-1 rounded-md ">
      <input
        type="text"
        name="chat"
        placeholder="Send a Message"
        className="outline-none grow focus:outline-none rounded-md py-2 px-2 "
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={(e) => handleChatQuery(e)}>
        <PaperAirplaneIcon className="w-6 absolute bottom-2 right-4" />
      </button>
    </form>
  );
};
