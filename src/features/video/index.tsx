import React, { useCallback, useEffect, useRef } from 'react';
import {
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  AgoraVideoPlayer,
} from 'agora-rtc-react';
import Controls from './Controls';
import LeftArrow from '../../assets/icons/chevron_left_FILL0_wght400_GRAD0_opsz48.svg';
import videoOff from '../../assets/icons/videocam_off_black_24dp.svg';
import add from '../../assets/icons/add_black_24dp.svg';
import group from '../../assets/icons/group_black_24dp.svg';
import iceBreakerLogo from '../../assets/logos/icebreaker-text-logo.png';
import styles from './video.module.scss';
import { useClient } from '../../utils/settings';
import useCountDown from '../../hooks/useCountdown';

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
  const [minutes, seconds] = useCountDown(300);

  const leaveChannel = useCallback(async () => {
    await client.leave();
    client.removeAllListeners();
    audioTrack.close();
    localVideoTrack.close();
    setStart(false);
    setInCall(false);
  }, [client, audioTrack, localVideoTrack, setStart, setInCall]);

  const leaveCallAndHome = async () => {
    leaveChannel();
    window.location.href = '/'; // navigate to home
  };

  useEffect(() => {
    // display a warning message when there is only 30 seconds left
    if (minutes + seconds === 0) leaveChannel();
  }, [minutes, seconds, leaveChannel]);

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
        <div className={styles.roomName}>Breaking the Ice</div>
        <div className={styles.interestBar}>Engineering</div>
      </div>
      <div id="video-chat-data" className={styles.chatData}>
        <div className={styles.connectedData}>
          <img src={group} alt={group} />
          <span>Connected to the call:</span>
          <span>2</span>
        </div>
        <button type="button" className={styles.addRequest}>
          <div>
            <img src={add} alt="add" />
          </div>
          <span>Friend Request</span>
        </button>
      </div>
      <div id="video-main" className={styles.videoMain} ref={videoRef}>
        {!localVideoTrack ? (
          <AgoraVideoPlayer
            id="video--local"
            videoTrack={localVideoTrack}
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <div
            className={styles.noVideoTrack}
          >
            No video track: Please allow camera access and try again.
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
            <div>
              {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}

            </div>
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
        <img src={iceBreakerLogo} alt="icebreaker" />
      </div>
    </div>
  );
}

export default VideoChat;
