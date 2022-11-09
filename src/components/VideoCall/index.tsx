import React from 'react';
import Client from './components/Client';
import Controls from './components/Controls';
import User from './components/User';

type Props = {};

// if we had chat system as well, we can import it here

function VideoCall({ users, tracks, setInCall, setStart }: Props) {
  // temp state, will be replaced with redux or context

  return (
    <div>
      <h2>VideoCall</h2>
      <div id="video-ctn">
        <Client tracks={tracks} />
        {users.length > 0 ? users.map((user) => <User user={user} />) : null}
      </div>
      <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
    </div>
  );
}

export default VideoCall;
