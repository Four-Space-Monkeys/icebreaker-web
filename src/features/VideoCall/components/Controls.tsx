import React, { useState } from 'react';
import { ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-react';
import { useClient } from '../../../utils/settings';
import styles from '../styles/VideoCall.module.scss';

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

<<<<<<< HEAD:src/components/VideoCall/components/Controls.tsx
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
||||||| d4d3495:src/components/VideoCall/components/Controls.tsx
=======
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>>>>>>> main:src/features/VideoCall/components/Controls.tsx
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
        <button type="button" onClick={() => mute('audio')}>
          {trackState.audio ? <div>MicOn</div> : <div>MicOff</div>}
        </button>
      </div>
      <div>
        <button type="button" onClick={() => mute('video')}>
          {trackState.video ? <div>VidOn</div> : <div>VidOff</div>}
        </button>
      </div>
      <div>
        <button type="button" onClick={() => leaveChannel()}>
          Leave
          <div>ExitIcon</div>
        </button>
      </div>
    </div>
  );
}

export default Controls;
