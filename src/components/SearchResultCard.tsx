import { SearchResult } from "./Search";
import { useVideoContext } from "../VideoContext";

type SearchResultCardProps = {
  result: SearchResult;
};

const formatTimeCode = (offset: number): string => {
  const secondsOffset = Math.floor(offset / 1000);
  const minutes = Math.floor(secondsOffset / 60);
  const seconds = secondsOffset % 60;
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export const SearchResultCard = ({ result }: SearchResultCardProps) => {
  const { setVideo } = useVideoContext();
  const timeInSeconds = Math.floor(result.offset / 1000);

  const handleVideoLinkClick = (e) => {
    e.preventDefault();
    setVideo(result.videoId, timeInSeconds);
  };
  return (
    <div className=" px-2 border-b  border-gray-300 last:border-none">
      <a
        href={`https://www.youtube.com/watch?v=${result.videoId}&t=${timeInSeconds}s`}
        onClick={handleVideoLinkClick}
      >
        <div className="flex justify-between">
          <p>
            {formatTimeCode(result.offset)} - {result.videoTitle}
          </p>
          <p>Score: {result.score.toFixed(2)}</p>
        </div>
        <p> {result.videoChannelName}</p>
        {/* <p>Transcript Text: {result.text}</p> */}
        <div className="flex justify-end"></div>
      </a>
    </div>
  );
};
