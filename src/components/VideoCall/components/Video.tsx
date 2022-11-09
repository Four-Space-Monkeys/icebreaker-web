import React from 'react';
import { AgoraVideoPlayer } from 'agora-rtc-react';

interface Props {
  videoTrack: any;
}

function Video({ videoTrack }: Props) {
  return (
    <AgoraVideoPlayer
      videoTrack={videoTrack}
      style={{ height: '100%', width: '100%' }}
    />
  );
}

export default Video;
