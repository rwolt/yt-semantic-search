import { api } from '../../convex/_generated/api';
import { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { useUser } from '@clerk/clerk-react';
import { Message } from './Message';
import { ChatInput } from './ChatInput';

// const renderHTML = (htmlString: string) => {
//   return { __html: htmlString };
// };

export const Chat = () => {
  const { user } = useUser();
  const [currentChat, setCurrentChat] = useState('');
  const createNewChat = useMutation(api.chat.create);
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
  return (
    <div className="bg-slate-300 h-[calc(100vh-65px)] p-6 pt-4 mx-4 mr-8  relative grow">
      <h2 className="text-2xl">Chat</h2>
      <div className="overflow-auto pb-40px mt-2">
        {chatHistory?.map((message) => (
          <Message key={message._id} text={message.text} role={message.role} />
        ))}
        {/* <div dangerouslySetInnerHTML={renderHTML(chatResponse?.text || '')} /> */}
      </div>
      <ChatInput chatId={currentChat} />
    </div>
  );
};
