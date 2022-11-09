import React from 'react';
import Video from './Video';

interface Props {
  videoTrack: any;
}
function User({ videoTrack }: Props) {
  return (
    <div>
      <Video videoTrack={videoTrack} />
    </div>
  );
}
export default User;
