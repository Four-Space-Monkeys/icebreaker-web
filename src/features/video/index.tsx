import React, { useRef } from 'react';
import {
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  AgoraVideoPlayer,
} from 'agora-rtc-react';
import Controls from './Controls';
import LeftArrow from '../../assets/icons/chevron_left_FILL0_wght400_GRAD0_opsz48.svg';
import videoOff from '../../assets/icons/videocam_off_FILL0_wght400_GRAD0_opsz48.svg';
import add from '../../assets/icons/add_FILL0_wght400_GRAD0_opsz48.svg';
import styles from './video.module.scss';
import { useClient } from '../../utils/settings';

// come back for volume control !!!

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
  const { videoTrack: userVideoTrack } = users.length > 0 ? users[0] : { videoTrack: null };
  const videoRef = useRef<HTMLDivElement>(null);
  const client = useClient();

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    audioTrack.close();
    localVideoTrack.close();
    setStart(false);
    setInCall(false);
  };
  const leaveCallAndHome = async () => {
    leaveChannel();
    window.location.href = '/'; // navigate to home
  };

  return (
    <div id="video-ctn" className={styles.videoCtn}>
      <div id="video-roomName" className={styles.videoRoomName}>
        <button
          className={styles.leave}
          type="button"
          onClick={() => leaveCallAndHome()}
        >
          <img src={LeftArrow} alt="back" />
        </button>
        <div className={styles.roomName}>
          Overview of new real estate proposals
        </div>
        <div className={styles.interestBar}>Engineering</div>
      </div>
      <div id="video-chat-data" className={styles.chatData}>
        <div className={styles.connectedData}>
          <div>
            Connected to the call:
            <span>2</span>
          </div>
        </div>
        <button type="button" className={styles.addRequest}>
          <div>
            <img src={add} alt="add" />
          </div>
          <span>Friend Request</span>
        </button>
      </div>
      <div id="video-main" className={styles.videoMain} ref={videoRef}>
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
            <div className={styles.userProfile}>H</div>
            <div>
              <div className={styles.userTitle}>Software Engineer</div>
              <div className={styles.userName}>Heemo Yang</div>
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
              <div className={styles.sideVideoPlayer}>
                <div className={styles.sideVideoOff}>
                  <img src={videoOff} alt="Video off" />
                </div>
              </div>
            )}
          </div>
          <Controls
            audioTrack={audioTrack}
            videoTrack={localVideoTrack}
            videoRef={videoRef}
            leaveChannel={leaveChannel}
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
