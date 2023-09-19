import { useEffect, useRef, useState } from 'react';
import { VideoInfo, useVideoContext } from '../VideoContext';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

export const VideoContainer = () => {
  const { videoInfo } = useVideoContext();
  const playerRef = useRef<YT.Player | null>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const onPlayerReady = (event: YT.PlayerEvent) => {
    setIsPlayerReady(true);
    event.target.playVideo();
  };

  useEffect(() => {
    console.log('loadVideo useEffect');
    if (isPlayerReady && playerRef.current) {
      loadVideoWithTime(videoInfo);
    }
  }, [isPlayerReady, videoInfo]);

  const loadVideoWithTime = ({ videoId, timeInSeconds }: VideoInfo) => {
    if (playerRef.current) {
      playerRef.current.loadVideoById({
        videoId,
        startSeconds: timeInSeconds,
      });
    }
  };

  useEffect(() => {
    // Wait for the YouTube iframe API script to load
    if (window.YT && typeof window.YT.Player === 'function') {
      // The YouTube API is available; check if the player has been initialized
      if (!playerRef.current) {
        playerRef.current = new YT.Player('video-player', {
          height: '360',
          width: '640',
          videoId: videoInfo.videoId,
          playerVars: {
            start: videoInfo.timeInSeconds,
            autoplay: 1,
          },
          events: {
            onReady: onPlayerReady,
          },
        });
      }
    }
  }, [videoInfo]);

  return (
    <div className="bg-gray-900 min-w-[640px] min-h-[360px] ">
      <div className={videoInfo.videoId !== '' ? '' : 'hidden'}>
        <div id="video-player" className={`min-w-[640px] min-h-[360px]`}></div>
      </div>
    </div>
  );
};
