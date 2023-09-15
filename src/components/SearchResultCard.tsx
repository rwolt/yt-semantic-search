import { SearchResult } from "./Search";

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
  return (
    <div className=" p-2 bg-slate-200 rounded-md">
      <p>Score: {result.score.toFixed(4)}</p>
      <p>Timecode: {formatTimeCode(result.offset)}</p>
      <p>Video Title: {result.videoTitle}</p>
      <p>Video Channel: {result.videoChannelName}</p>
      {/* <p>Transcript Text: {result.text}</p> */}
    </div>
  );
};
