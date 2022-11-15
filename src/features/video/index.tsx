import React from 'react';
import {
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  AgoraVideoPlayer,
} from 'agora-rtc-react';
import Controls from './Controls';
import LeftArrow from '../../assets/icons/chevron_left_FILL0_wght400_GRAD0_opsz48.svg';
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
        <button
          className={styles.leave}
          type="button"
          onClick={() => console.log('leave!')}
        >
          <img src={LeftArrow} alt="back" />
        </button>
        <div className={styles.roomName}>
          Overview of new real estate proposals
        </div>
        <div className={styles.interestBar}>Engineering</div>
      </div>
      <div id="video-chat-data" className={styles.chatData}>
        <div>
          <div>Connected to the call:</div>
          <span>2</span>
        </div>
        <button type="button" className={styles.request}>
          Some Button
        </button>
      </div>
      <div id="video-main" className={styles.videoMain}>
        {localVideoTrack ? (
          <AgoraVideoPlayer
            id="video--local"
            videoTrack={localVideoTrack}
            style={{ width: '100%', height: '100%' }}
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
            {userVideoTrack ? (
              <AgoraVideoPlayer
                id="video--client"
                videoTrack={userVideoTrack}
                className={styles.sideVideoPlayer}
              />
            ) : (
              <div className={styles.sideVideoPlayer}>No Video Track</div>
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
