import React from 'react';
import { IAgoraRTCRemoteUser, ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-react';
import Controls from './components/Controls';
import User from './components/User';
import styles from './styles/VideoCall.module.scss';

interface IVideoCallProps {
  users: IAgoraRTCRemoteUser[];
  audioTrack: IMicrophoneAudioTrack;
  videoTrack: ICameraVideoTrack;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}
//
// we can add chat here as well
function VideoCall({
  users,
  audioTrack,
  videoTrack,
  setInCall,
  setStart,
}: IVideoCallProps) {
  // useEffect(() => {
  //   setGridSpacing(Math.max(Math.floor(12 / (users?.length || 0 + 1)), 4));
  // }, [users, audioTrack, videoTrack]);

  return (
    <div className={styles.container}>
      <h2>VideoCall</h2>
      <div id="video-ctn" className={styles.container}>
        {videoTrack ? (
          <User videoTrack={videoTrack} />
        ) : (
          <div className={styles.videoTrack}> No Client </div>
        )}
        {users.length > 0 ? (
          users.map((user) => (
            <User key={user.uid} videoTrack={user.videoTrack} />
          ))
        ) : (
          <div className={styles.videoTrack}> No User </div>
        )}
      </div>
      <Controls
        audioTrack={audioTrack}
        videoTrack={videoTrack}
        setStart={setStart}
        setInCall={setInCall}
      />
    </div>
  );
}

export default VideoCall;
