import { useEffect, useRef } from 'react';
import { VideoInfo, useVideoContext } from '../VideoContext';

export const VideoContainer = () => {
  const { videoInfo } = useVideoContext();
  const playerRef = useRef<YT.Player | null>(null);

  useEffect(() => {
    window.onYouTubeIframeAPIReady = () => {
      if (playerRef.current) {
        loadVideoWithTime(videoInfo);
      } else {
        playerRef.current = new YT.Player('video-player', {
          height: '360',
          width: '640',
          videoId: videoInfo.videoId || 'xm3YgoEiEDc',
          playerVars: {
            start: videoInfo.timeInSeconds || 0,
            autoplay: 1,
          },
          events: {
            onReady: onPlayerReady,
          },
        });
      }
    };
  }, [videoInfo]);

  const loadVideoWithTime = ({ videoId, timeInSeconds }: VideoInfo) => {
    if (playerRef.current) {
      playerRef.current.loadVideoById({
        videoId,
        startSeconds: timeInSeconds,
      });
    }
  };

  const onPlayerReady = (e) => {
    e.target.playVideo();
  };

  return (
    <div className="w-1/2 bg-sky-300 h-full">
      <div id="video-player"></div>
    </div>
  );
};
