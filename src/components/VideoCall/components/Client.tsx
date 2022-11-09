import React from 'react';
import Video from './Video';

interface Props {
  tracks: any[];
}

const styles = {
  client: {
    flex: 1,
    backgroundColor: 'black',
    color: 'white',
    width: '100%',
  },
};

function Client({ tracks }: Props) {
  return (
    <div style={styles.client}>
      {(tracks.length <= 1) ? <div>No Client View</div> : <Video videoTrack={tracks[1]} />}
    </div>
  );
}

export default Client;
