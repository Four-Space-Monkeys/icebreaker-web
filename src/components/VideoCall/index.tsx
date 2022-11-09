import React from 'react';
import Client from './components/Client';
import Controls from './components/Controls';
import User from './components/User';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100%',
    maxWidth: '800px',
    outline: '10px solid black',
  },
  'no-user': {
    flex: 1,
    backgroundColor: 'skyblue',
    zIndex: 1,
    width: '100%',
  },

};

interface IUser {
  uid: number;
  videoTrack: any;
}

interface Props {
  users: IUser[];
  tracks: any[];
  setStart: (start: boolean) => void;
  setInCall: (inCall: boolean) => void;
}

// we can add chat here as well
function VideoCall({
  users, tracks, setInCall, setStart,
}: Props) {
  // temp state, will be replaced with redux or context

  return (
    <div>
      <h2>VideoCall</h2>
      <div id="video-ctn" style={styles.container}>
        <Client tracks={tracks} />
        {/* There will only be one match at all times, but I'll keep it as a list here for now */}
        {users.length > 0
          ? users.map((user) => (
            <User key={user.uid} videoTrack={user.videoTrack} />
          ))
          : <div style={styles['no-user']}> No User </div>}
      </div>
      <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
    </div>
  );
}

export default VideoCall;
