import React, { useState } from 'react';
import { ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-react';
import micOn from '../../assets/icons/mic_FILL0_wght400_GRAD0_opsz48.svg';
import micOff from '../../assets/icons/mic_off_FILL0_wght400_GRAD0_opsz48 (1).svg';
import videoOn from '../../assets/icons/videocam_FILL0_wght400_GRAD0_opsz48.svg';
import videoOff from '../../assets/icons/videocam_off_FILL0_wght400_GRAD0_opsz48.svg';
import exit from '../../assets/icons/exit_to_app_FILL0_wght400_GRAD0_opsz48.svg';
import { useClient } from '../../utils/settings';
import styles from './video.module.scss';

interface IControlsProps {
  audioTrack: IMicrophoneAudioTrack;
  videoTrack: ICameraVideoTrack;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}

function Controls({
  audioTrack, videoTrack, setStart, setInCall,
}: IControlsProps) {
  const client = useClient();
  const [trackState, setTrackState] = useState({ video: true, audio: true });

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

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    audioTrack.close();
    videoTrack.close();
    setStart(false);
    setInCall(false);
  };
  return (
    <div className={styles.controlsCtn}>
      <div>
        <button
          className={styles.controlsIcon}
          type="button"
          onClick={() => mute('audio')}
        >
          {trackState.audio ? (
            <img src={micOn} alt="mic" />
          ) : (
            <img src={micOff} alt="mic" />
          )}
        </button>
      </div>
      <div>
        <button
          className={styles.controlsIcon}
          type="button"
          onClick={() => mute('video')}
        >
          {trackState.video ? <img src={videoOn} alt="video" /> : <img src={videoOff} alt="video" />}
        </button>
      </div>
      <div>
        <button
          className={styles.controlsIcon}
          type="button"
          onClick={() => leaveChannel()}
        >
          <img src={exit} alt="exit" />
        </button>
      </div>
    </div>
  );
}

export default Controls;
