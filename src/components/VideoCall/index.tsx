import React from 'react';
import Video from './components/Video';

type Props = {};

function VideoCall({ children }: Props) {
  return (
    <div>
      <h2>VideoCall</h2>
      <Video />
    </div>
  );
}

export default VideoCall;
