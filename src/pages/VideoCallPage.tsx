// import { IAgoraRTCRemoteUser } from 'agora-rtc-react';
import React from 'react';
import VideoCall from '../components/VideoCall/index';
import useAgora from '../hooks/useAgora';
import {
  token,
  channelName,
} from '../utils/settings';

function VideoCallPage({
  setInCall,
}: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    start, setStart, audioTrack, videoTrack, users,
  } = useAgora(
    channelName,
    token,
  );

  if (!audioTrack || !videoTrack) return <div>Requires permission to use the audio and video</div>;

  return (
    <VideoCall
      users={users}
      audioTrack={audioTrack}
      videoTrack={videoTrack}
      setInCall={setInCall}
      setStart={setStart}
    />
  );
}

export default VideoCallPage;
