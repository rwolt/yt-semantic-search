import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { VideoListItem } from "./VideoListItem";
import { Id } from "../../convex/_generated/dataModel";

type VideoListProps = {
  collection: {
    name: string;
    id: Id<"collections"> | "all";
  };
};

export const VideoList = ({ collection }: VideoListProps) => {
  const videoItems = useQuery(api.video.getTitles, {
    collectionId: collection.id,
  });

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
