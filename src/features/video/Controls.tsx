import React, { useState, useEffect } from 'react';
import { ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-react';
import fullScreen from '../../assets/icons/fullscreen_FILL0_wght400_GRAD0_opsz48.svg';
import fullScreenExit from '../../assets/icons/close_fullscreen_FILL0_wght400_GRAD0_opsz48.svg';
import micOn from '../../assets/icons/mic_black_24dp.svg';
import micOff from '../../assets/icons/mic_off_black_24dp.svg';
import endCall from '../../assets/icons/call_end_black_24dp.svg';
import videoOn from '../../assets/icons/videocam_black_24dp.svg';
import videoOff from '../../assets/icons/videocam_off_black_24dp.svg';
import settings from '../../assets/icons/settings_black_24dp.svg';
import styles from './video.module.scss';

interface IControlsProps {
  audioTrack: IMicrophoneAudioTrack;
  videoTrack: ICameraVideoTrack;
  videoRef: React.RefObject<HTMLDivElement>;
  leaveChannel: () => void;
}

function Controls({

  audioTrack,
  videoTrack,
  videoRef,
  leaveChannel,
}: IControlsProps) {
  const [trackState, setTrackState] = useState({ video: true, audio: true });
  const [fullScreenMode, setFullScreenMode] = useState(false);

  useEffect(() => {
    function onFullscreenChange() {
      setFullScreenMode(Boolean(document.fullscreenElement));
    }
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const mute = async (type: string) => {
    if (type === 'audio') {
      await audioTrack.setEnabled(!trackState.audio);
      setTrackState((ps) => ({ ...ps, audio: !ps.audio }));
    }

    if (type === 'video') {
      await videoTrack.setEnabled(!trackState.video);
      setTrackState((ps) => ({ ...ps, video: !ps.video }));
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const switchChannel = async () => {
    // if use wants to join another channel
  };

  return (
    <div className={styles.controlsCtn}>
      <div>
        <button
          className={styles.controlsIcon}
          type="button"
          onClick={() => {
            if (!fullScreenMode) {
              videoRef.current?.requestFullscreen({
                navigationUI: 'hide',
              });
            } else document.exitFullscreen();
          }}
        >
          {fullScreenMode ? (
            <img src={fullScreenExit} alt="fullScreen exit" />
          ) : (
            <img src={fullScreen} alt="fullScreen" />
          )}
        </button>
      </div>
      <div>
        <button
          className={styles.controlsIcon}
          type="button"
          onClick={() => mute('audio')}
        >
          {trackState.audio ? (
            <img src={micOn} alt="mic on" />
          ) : (
            <img src={micOff} alt="mic off" />
          )}
        </button>
      </div>
      <div>
        <button
          className={`${styles.controlsIcon} ${styles.endCall}`}
          type="button"
          onClick={() => leaveChannel()}
        >
          <img src={endCall} alt="end call" />
        </button>
      </div>
      <div>
        <button
          className={styles.controlsIcon}
          type="button"
          onClick={() => mute('video')}
        >
          {trackState.video ? (
            <img src={videoOn} alt="video on" />
          ) : (
            <img src={videoOff} alt="video off" />
          )}
        </button>
      </div>
      <div>
        <button
          className={styles.controlsIcon}
          type="button"
          onClick={() => alert('settings')}
        >
          <img src={settings} alt="settings" />
        </button>
      </div>
    </div>
  );
}

export default Controls;
