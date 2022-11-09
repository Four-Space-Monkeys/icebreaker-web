import React from 'react';
import VideoCall from '../components/VideoCall/index';

type Props = {};

function VideoCallPage({ children }: Props) {
  return (
    <div>
      <h1>VideoCallPage</h1>
      <VideoCall />
    </div>
  );
}

export default VideoCallPage;
