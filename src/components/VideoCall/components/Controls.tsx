import React, { useState } from 'react';
import { ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-react';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useClient } from '../settings';

interface IControlsProps {
  audioTrack: IMicrophoneAudioTrack;
  videoTrack: ICameraVideoTrack;
  setInCall: (inCall: boolean) => void;
  setStart: (start: boolean) => void;
}

function Controls({
  audioTrack, videoTrack, setStart, setInCall,
}: IControlsProps) {
  return <div>Controls</div>;
}

export default Controls;

export default function Controls({ tracks, setStart, setInCall }) {
  const client = useClient();
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type) => {
    if (type === 'audio') {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => ({ ...ps, audio: !ps.audio }));
    }

    if (type === 'video') {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => ({ ...ps, video: !ps.video }));
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      style={{
        display: 'flex',
        justifyContent: 'end',
        gap: '10px',
        padding: '10px',
      }}
    >
      <Grid item>
        <Button
          variant="contained"
          color={trackState.audio ? 'primary' : 'secondary'}
          onClick={() => mute('audio')}
        >
          {trackState.audio ? <MicIcon /> : <MicOffIcon />}
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color={trackState.video ? 'primary' : 'secondary'}
          onClick={() => mute('video')}
        >
          {trackState.video ? <VideocamIcon /> : <VideocamOffIcon />}
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="default"
          onClick={() => leaveChannel()}
        >
          Leave
          {' '}
          <ExitToAppIcon />
        </Button>
      </Grid>
    </Grid>
  );
}
