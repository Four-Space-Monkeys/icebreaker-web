import React from 'react';
import Video from './Video';

interface IUserProps {
  videoTrack: any;
}
function User({ videoTrack }: IUserProps) {
  return (
    <div>
      <Video videoTrack={videoTrack} />
    </div>
  );
}
export default User;
