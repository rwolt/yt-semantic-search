import { PlayCircleIcon, PlayIcon } from '@heroicons/react/24/outline';

type VideoListItemProps = {
  videoTitle: string;
  videoChannelName: string;
};

export const VideoListItem = ({
  videoTitle,
  videoChannelName,
}: VideoListItemProps) => {
  return (
    <div className="flex flex-row align-center mb-2">
      <PlayIcon className="w-6 shrink-0" />
      <div className="ml-2 flex flex-col overflow-hidden">
        <p className="whitespace-nowrap">{videoTitle}</p>
        <p className="text-sm whitespace-nowrap">{videoChannelName}</p>
      </div>
    </div>
  );
};
