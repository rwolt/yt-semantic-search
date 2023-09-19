import { useVideoContext } from '../VideoContext';

type MessageProps = {
  role: string;
  text: string;
};

// Parse the assistant messages to render as markup
const parseText = (messageJsonString: string): JSX.Element[] => {
  const statements = JSON.parse(messageJsonString);
  const messageArray = statements.text.map(
    (
      item: {
        content: string;
        source: { offset?: number; videoId?: string };
      },
      index: number
    ) => {
      if (item.source.offset && item.source.videoId) {
        const { offset, videoId } = item.source;
        const offsetInSeconds = Math.floor(offset / 1000);

        const { setVideo } = useVideoContext();

        const handleVideoLinkClick = (
          e: React.MouseEvent,
          videoId: string,
          offsetInSeconds: number
        ) => {
          e.preventDefault();
          setVideo(videoId, offsetInSeconds);
        };

        return (
          <a
            key={index}
            href={`https://www.youtube.com/watch?v=${videoId}&t=${offsetInSeconds}`}
            onClick={(e) => handleVideoLinkClick(e, videoId, offsetInSeconds)}
          >
            <span className="hover:underline">{item.content + ' '}</span>
          </a>
        );
      } else {
        return <span>{item.content + ' '}</span>;
      }
    }
  );

  return messageArray;
};

export const Message = ({ role, text }: MessageProps) => {
  return (
    <div
      className={`rounded-md p-2 my-2
        ${
          role === 'assistant'
            ? 'bg-teal-400 text-black'
            : 'bg-orange-400 text-black'
        }
      `}
    >
      {role === 'assistant' ? parseText(text) : text}
    </div>
  );
};
