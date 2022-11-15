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

  const { videoTrack: userVideoTrack } = users.length > 0 ? users[0] : { videoTrack: null };

  return (
    <div id="video-ctn" className={styles.videoCtn}>
      <div id="video-roomName" className={styles.videoRoomName}>
        <button type="button">Leave</button>
        <div>Overview of new real estate proposals</div>
        <div>Show interest bar here</div>
      </div>
      <div id="video-chat-data" className={styles.chatData}>
        Some chat info here
        <button type="button" className={styles.request}>
          Some Button
        </button>
      </div>
      <div id="video-main" className={styles.videoMain}>
        {userVideoTrack ? (
          <AgoraVideoPlayer
            id="video--local"
            videoTrack={userVideoTrack}
            style={{ height: '100%', width: '100%' }}
          />
        ) : (
          <div
            className={styles.noVideoTrack}
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: 'grey',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            No video track
          </div>
        )}
        <div id="video-overlays" className={styles.overlays}>
          <div id="video--user-info" className={styles.userInfo}>
            <div>profile</div>
            <div>
              <div>user title</div>
              <div>user name</div>
            </div>
          </div>
          <div id="video--timer" className={styles.timer}>
            <div>00:00</div>
          </div>
          <div id="video-side" className={styles.sideVideo}>
            {localVideoTrack ? (
              <AgoraVideoPlayer
                id="video--client"
                videoTrack={localVideoTrack}
                style={{ height: '150px', width: '150px' }}
              />
            ) : (
              <div style={{ height: '150px', width: '150px' }}>
                No video track
              </div>
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
      <div id="video-footer" className={styles.footer}>
        Ads
      </div>
    </div>
  );
}

export default VideoChat;
