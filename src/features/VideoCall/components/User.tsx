import React from 'react';
import Video from './Video';
import styles from '../styles/VideoCall.module.scss';

interface IUserProps {
  videoTrack: any;
}
function User({ videoTrack }: IUserProps) {
  return (
    <div className={styles.videoTrack}>
      <Video videoTrack={videoTrack} />
    </div>
  );
}
export default User;
