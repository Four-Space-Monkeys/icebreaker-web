import React from 'react';

type Props = {
  tracks: [];
  setInCall: (inCall: boolean) => void;
  setStart: (start: boolean) => void;
};

function Controls({ tracks, setStart, setInCall }: Props) {
  return <div>Controls</div>;
}

export default Controls;
