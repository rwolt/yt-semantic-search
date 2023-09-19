import { PlayIcon } from '@heroicons/react/24/outline';
import { useVideoContext } from '../VideoContext';

type VideoListItemProps = {
  videoId: string;
  videoTitle: string;
  videoChannelName: string;
};

export const VideoListItem = ({
  videoId,
  videoTitle,
  videoChannelName,
}: VideoListItemProps) => {
  const { setVideo } = useVideoContext();
  const handleVideoLinkClick = (e) => {
    e.preventDefault();
    setVideo(videoId, 0);
  };
  return (
    <a
      href={`https://youtube.com/watch?v=${videoId}`}
      onClick={handleVideoLinkClick}
    >
      <div className="flex flex-row align-center mb-2">
        <PlayIcon className="w-6 shrink-0" />
        <div className="ml-2 flex flex-col overflow-hidden">
          <p className="whitespace-nowrap cursor-pointer select-none text-lg">
            {videoTitle}
          </p>
          <p className=" whitespace-nowrap cursor-pointer select-none text-md">
            {videoChannelName}
          </p>
        </div>
      </div>
    </a>
  );
};
