import React, { useState } from 'react';
import { ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-react';
import { useClient } from '../../../utils/settings';

const styles = {
  controlsContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    padding: '10px',
    background: 'grey',
  },
};
interface IControlsProps {
  audioTrack: IMicrophoneAudioTrack;
  videoTrack: ICameraVideoTrack;
  setInCall: (inCall: boolean) => void;
  setStart: (start: boolean) => void;
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

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    audioTrack.close();
    videoTrack.close();
    setStart(false);
    setInCall(false);
  };
  return (
    <div style={styles.controlsContainer}>
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
