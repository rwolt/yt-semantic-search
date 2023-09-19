import { api } from '../../convex/_generated/api';
import { useEffect, useRef, useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { useUser } from '@clerk/clerk-react';
import { Message } from './Message';
import { ChatInput } from './ChatInput';

export const Chat = () => {
  const { user } = useUser();
  const [currentChat, setCurrentChat] = useState('');
  const createNewChat = useMutation(api.chat.create);
  const chatHistoryRef = useRef<HTMLDivElement | null>(null);
  const chatHistory = useQuery(api.message.getChatHistory, {
    chatId: currentChat,
  });
  useEffect(() => {
    async function createChat(userId: string) {
      const newChat = await createNewChat({ userId });
      setCurrentChat(newChat);
    }
    if (user) {
      createChat(user.id);
    }
  }, [createNewChat, user]);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);
  return (
    <div className="bg-dark-gray-700 border-l-2 border-dark-gray-400 max-h-[calc(100vh-65px)] min-h-[calc(100vh-65px)] p-6 pt-4 mx-4 mr-8 relative ">
      <h2 className="text-2xl">Chat</h2>
      <div
        className=" max-h-[calc(100vh-65px-150px)] overflow-y-auto pb-40px mt-2"
        ref={chatHistoryRef}
      >
        <p></p>
        {chatHistory?.map((message) => (
          <Message key={message._id} text={message.text} role={message.role} />
        ))}
      </div>
      <ChatInput chatId={currentChat} />
    </div>
  );
};
