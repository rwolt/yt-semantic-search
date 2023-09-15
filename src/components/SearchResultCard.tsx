import { SearchResult } from "./Search";

type SearchResultCardProps = {
  result: SearchResult;
};

export const SearchResultCard = ({ result }: SearchResultCardProps) => {
  return (
    <div className="w-1/5 p-2 m-2 justify-even bg-slate-200 rounded-md">
      <p>Score: {result.score.toFixed(4)}</p>
      <p>Video Title: {result.videoTitle}</p>
      <p>Video Channel: {result.videoChannelName}</p>
      {/* <p>Transcript Text: {result.text}</p> */}
    </div>
  );
};
