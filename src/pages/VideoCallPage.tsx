import React, { useEffect, useState } from 'react';
import VideoCall from '../components/VideoCall/index';

type Props = {
  users: [];
  tracks: [];
};
// entry point for the video call
function VideoCallPage({ users, tracks }: Props) {
  const [inCall, setInCall] = useState(false);
  const [start, setStart] = useState(false);
  // const [gridSpacing, setGridSpacing] = useState(12);
  // user should be able to leave the video call
  // and be redirected to the home page
  useEffect(() => {
    // setGridSpacing(Math.max(Math.floor(12 / (users?.length || 0 + 1)), 4));
  }, [users, tracks]);

  return (
    <VideoCall
      users={users}
      tracks={tracks}
      setInCall={setInCall}
      setStart={setStart}
    />
  );
}

export default VideoCallPage;
