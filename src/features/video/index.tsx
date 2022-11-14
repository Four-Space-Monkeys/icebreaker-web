import React from 'react';
import {
  IAgoraRTCRemoteUser, ICameraVideoTrack, IMicrophoneAudioTrack, AgoraVideoPlayer,
} from 'agora-rtc-react';
import Controls from './Controls';
import styles from './video.module.scss';

interface IVideoCallProps {
  users: IAgoraRTCRemoteUser[];
  audioTrack: IMicrophoneAudioTrack;
  videoTrack: ICameraVideoTrack;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}
//
// we can add chat here as well
function VideoChat({
  users,
  audioTrack,
  videoTrack,
  setInCall,
  setStart,
}: IVideoCallProps) {
  // useEffect(() => {
  //   setGridSpacing(Math.max(Math.floor(12 / (users?.length || 0 + 1)), 4));
  // }, [users, audioTrack, videoTrack]);

  const user = users ? users[0] : null;

  return (
    <div id="video-ctn" className={styles.container}>
      <div id="video-main">
        <AgoraVideoPlayer id="video--user" videoTrack={videoTrack} />
      </div>
      <div id="video-overlays" className={styles.container}>
        <div id="video--user-info" className={styles.userInfo} />
        <div id="video--timer" className={styles.timer}>
          <div>00:00</div>
        </div>
        <div id="video-side">
          <AgoraVideoPlayer id="video--client" videoTrack={user?.videoTrack} />
        </div>
        <Controls
          audioTrack={audioTrack}
          videoTrack={videoTrack}
          setStart={setStart}
          setInCall={setInCall}
        />
      </div>
    </div>
  );
}

export default VideoChat;
