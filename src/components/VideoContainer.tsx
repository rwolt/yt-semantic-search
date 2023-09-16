import { useEffect, useRef } from 'react';
import { VideoInfo, useVideoContext } from '../VideoContext';

export const VideoContainer = () => {
  const { videoInfo } = useVideoContext();
  const playerRef = useRef<YT.Player | null>(null);

  window.onYouTubeIframeAPIReady = () => {
    if (playerRef.current) {
      loadVideoWithTime(videoInfo);
    } else {
      playerRef.current = new YT.Player('video-player', {
        height: '360',
        width: '640',
        videoId: videoInfo.videoId || 'xm3YgoEiEDc',
        playerVars: {
          start: videoInfo.timeInSeconds,
          autoplay: 1,
        },
        events: {
          onReady: onPlayerReady,
        },
      });
    }
  };

  useEffect(() => {
    loadVideoWithTime(videoInfo);
  }, [videoInfo]);

  const loadVideoWithTime = ({ videoId, timeInSeconds }: VideoInfo) => {
    console.log('before conditional loadingVideo');
    if (playerRef.current) {
      console.log('after conditional loadingVideo');
      playerRef.current.loadVideoById({
        videoId,
        startSeconds: timeInSeconds,
      });
    }
  };

  const onPlayerReady = (event) => {
    console.log('on player ready');
    event.target.playVideo();
  };

  return (
    <div className="w-1/2 bg-sky-300 h-full">
      <div id="video-player"></div>
    </div>
  );
};
