import React from 'react';
import Video from './Video';

type Props = {
  user: {
    uid: string;
    videoTrack: any;
  };
};
function User({ user }: Props) {
  return (
    <div>
      <Video uid={user.uid} videoTracks={user.videoTrack} />
    </div>
  );
}
export default User;
