import { useEffect, useRef } from 'react';
import { VideoInfo, useVideoContext } from '../VideoContext';

export const VideoContainer = () => {
  const { videoInfo } = useVideoContext();
  const playerRef = useRef<YT.Player | null>(null);

  const onPlayerReady = (event) => {
    event.target.playVideo();
  };

  useEffect(() => {
    window.onYouTubeIframeAPIReady = () => {
      if (playerRef.current) {
        loadVideoWithTime(videoInfo);
      } else {
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
    };
  }, [videoInfo]);

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

  return (
    <div className="bg-gray-900 ">
      <div id="video-player" className="min-w-[640px] min-h-[320px]"></div>
    </div>
  );
};
