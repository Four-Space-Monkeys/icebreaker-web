import React from 'react';
import { AgoraVideoPlayer, ICameraVideoTrack } from 'agora-rtc-react';
import styles from './video.module.scss';

interface IVideoProps {
  videoTrack: ICameraVideoTrack | null;
}

function Video({ videoTrack }: IVideoProps) {
  if (!videoTrack) {
    return (
      <div className={styles.noVideoTrack} />
    );
  }
  return (
    <AgoraVideoPlayer
      videoTrack={videoTrack}
      style={{ height: '500px', width: '500px' }}
    />
  );
}

export default Video;
