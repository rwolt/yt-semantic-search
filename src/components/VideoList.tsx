import { useQuery } from 'convex/react';
import { useUser } from '@clerk/clerk-react';
import { api } from '../../convex/_generated/api';
import { VideoListItem } from './VideoListItem';
import { Id } from '../../convex/_generated/dataModel';

type VideoListProps = {
  collection: {
    name: string;
    id: Id<'collections'> | 'all';
  };
};

export const VideoList = ({ collection }: VideoListProps) => {
  const { user } = useUser();
  const videoItems = useQuery(api.video.getTitles, {
    collectionId: collection.id,
    userId: user?.id,
  });

  return (
    <div className="mt-4">
      {videoItems?.map((item) => (
        <VideoListItem
          key={item.videoId}
          videoId={item.videoId}
          videoTitle={item.videoTitle}
          videoChannelName={item.videoChannelName}
        />
      ))}
    </div>
  );
};
