import { DocumentPreview } from "./DocumentPreview";
import { VideoContainer } from "./VideoContainer";
export const Preview = () => {
  return (
    <div className="flex flex-row h-full">
      <VideoContainer />
      <DocumentPreview />
    </div>
  );
};
