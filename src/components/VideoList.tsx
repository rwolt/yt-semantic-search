import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { VideoListItem } from './VideoListItem';

type VideoListProps = {
  collection: string;
};

export const VideoList = ({ collection }: VideoListProps) => {
  const videoItems = useQuery(api.video.getTitles);

  return (
    <div className="mt-4">
      {videoItems?.map((item) => (
        <VideoListItem
          key={item.videoId}
          videoTitle={item.videoTitle}
          videoChannelName={item.videoChannelName}
        />
      ))}
    </div>
  );
};
