import React from 'react';
import VideoCall from '../components/VideoCall/index';
import useAgora from '../hooks/useAgora';
<<<<<<< HEAD
import { token, channelName } from '../utils/settings';
=======
import { RoomInfo } from '../types';
>>>>>>> a036e21bf4daac07ba0ae81dc1378e21cd949b91

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
    start, setStart, audioTrack, videoTrack, users,
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
