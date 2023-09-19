type MessageProps = {
  role: string;
  text: string;
};
export const Message = ({ role, text }: MessageProps) => {
  return (
    <div
      className={
        role === 'assistant'
          ? 'bg-light-gray-400 text-black'
          : 'bg-orange-400 text-white'
      }
    >
      {text}
    </div>
  );
};
