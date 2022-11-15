import React from 'react';
import {
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  AgoraVideoPlayer,
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
  videoTrack: localVideoTrack,
  setInCall,
  setStart,
}: IVideoCallProps) {
  // useEffect(() => {
  //   setGridSpacing(Math.max(Math.floor(12 / (users?.length || 0 + 1)), 4));
  // }, [users, audioTrack, videoTrack]);

  const { videoTrack: userVideoTrack } = users ? users[0] : { videoTrack: null };

  return (
    <div id="video-ctn" className={styles.container}>
      <div id="video-main">
        {localVideoTrack
          ? <AgoraVideoPlayer id="video--local" videoTrack={localVideoTrack} />
          : <div className={styles.noVideoTrack} />}
      </div>
      <div id="video-overlays" className={styles.container}>
        <div id="video--user-info" className={styles.userInfo} />
        <div id="video--timer" className={styles.timer}>
          <div>00:00</div>
        </div>
        <div id="video-side">
          {userVideoTrack ? (
            <AgoraVideoPlayer id="video--client" videoTrack={userVideoTrack} />
          ) : (
            <div>No video track</div>
          )}
        </div>
        <Controls
          audioTrack={audioTrack}
          videoTrack={localVideoTrack}
          setStart={setStart}
          setInCall={setInCall}
        />
      </div>
    </div>
  );
}

export default VideoChat;
