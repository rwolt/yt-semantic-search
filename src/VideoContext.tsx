import { useState, createContext, PropsWithChildren, useContext } from 'react';

export type VideoInfo = {
  videoId: string;
  timeInSeconds: number;
};

type VideoContextType = {
  videoInfo: VideoInfo;
  setVideo: (videoId: string, timeInSeconds: number) => void;
};

export const VideoContext = createContext({} as VideoContextType);

export const useVideoContext = () => {
  return useContext(VideoContext);
};

export const VideoProvider = ({ children }: PropsWithChildren) => {
  const [videoInfo, setVideoInfo] = useState<VideoInfo>({
    videoId: '',
    timeInSeconds: 0,
  });

  const setVideo = (videoId: string, timeInSeconds: number) => {
    setVideoInfo({ videoId, timeInSeconds });
  };

  return (
    <VideoContext.Provider value={{ videoInfo, setVideo }}>
      {children}
    </VideoContext.Provider>
  );
};
