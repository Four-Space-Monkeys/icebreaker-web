import React from 'react';
import VideoCall from '../features/video/index';
import useAgora from '../hooks/useAgora';
import { RoomInfo } from '../types';

function VideoCallPage({
  uid,
  setInCall,
  roomInfo,
}: {
  uid: number;
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  roomInfo: RoomInfo;
}) {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    start,
    setStart,
    audioTrack,
    videoTrack,
    users,
  } = useAgora(
    uid,
    roomInfo.channel,
    roomInfo.token,
  );

  if (!audioTrack || !videoTrack) {
    return <div>Requires permission to use the audio and video</div>;
  }

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
