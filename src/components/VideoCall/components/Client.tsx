import React from 'react';
import Video from './Video';

type Props = {};

function Client({ tracks }: Props) {
  return (
    <div>
      <div>Render Client Here!</div>
      <Video uid="client" videoTrack={tracks[1]} />
    </div>
  );
}

export default Client;
