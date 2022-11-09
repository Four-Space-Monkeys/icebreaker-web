import React, { useEffect, useState } from 'react';
import VideoCall from '../components/VideoCall/index';

type Props = {
  users: [];
  tracks: [];
};

function VideoCallPage({ users, tracks }: Props) {
  const [gridSpacing, setGridSpacing] = useState(12);

  useEffect(() => {
    setGridSpacing(Math.max(Math.floor(12 / (users?.length || 0 + 1)), 4));
  }, [users, tracks]);

  return (
    <div>
      <h1>VideoCallPage</h1>
      <VideoCall />
    </div>
  );
}

export default VideoCallPage;
