import React from 'react';
import { AgoraVideoPlayer } from 'agora-rtc-react';

type Props = {
  uid: string;
  videoTrack: any;
};

function Video({ uid, videoTrack }: Props) {
  return (
    <AgoraVideoPlayer
      key={uid}
      videoTrack={videoTrack}
      style={{ height: '100%', width: '100%' }}
    />
  );
}

export default Video;
