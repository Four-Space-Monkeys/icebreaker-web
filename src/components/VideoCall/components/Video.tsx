import React from 'react';
import { AgoraVideoPlayer } from 'agora-rtc-react';

interface IVideoProps {
  videoTrack: any;
}

function Video({ videoTrack }: IVideoProps) {
  return (
    <AgoraVideoPlayer
      videoTrack={videoTrack}
      style={{ height: '100%', width: '100%' }}
    />
  );
}

export default Video;
