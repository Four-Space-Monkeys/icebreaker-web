import React, { } from 'react';

interface Props {
  tracks: any[];
  setInCall: (inCall: boolean) => void;
  setStart: (start: boolean) => void;
}

function Controls({ tracks, setStart, setInCall }: Props) {
  return <div>Controls</div>;
}

export default Controls;
