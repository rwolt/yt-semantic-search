import { SearchResult } from './Search';
import { useVideoContext } from '../VideoContext';

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
    <div className=" p-2 bg-slate-200 rounded-md">
      <p>Score: {result.score.toFixed(4)}</p>
      {/* <p>Timecode: {formatTimeCode(result.offset)}</p> */}
      <a
        href={`https://www.youtube.com/watch?v=${result.videoId}&t=${timeInSeconds}s`}
        onClick={handleVideoLinkClick}
      >
        {formatTimeCode(result.offset)}
      </a>
      <p>Video Title: {result.videoTitle}</p>
      <p>Video Channel: {result.videoChannelName}</p>
      {/* <p>Transcript Text: {result.text}</p> */}
    </div>
  );
};
