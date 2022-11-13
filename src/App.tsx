import React, { useState } from 'react';
<<<<<<< HEAD
import { useStytchSession } from '@stytch/react';
||||||| d4d3495
=======
import MenuBar from './layout/menubar/MenuBar';
>>>>>>> main
import Home from './pages/Home';
import VideoCallPage from './pages/VideoCallPage';

import { RoomInfo } from './types';

function App() {
  const [roomInfo, setRoomInfo] = useState<undefined | RoomInfo>(undefined);
  const [inCall, setInCall] = useState(false);

  const { session } = useStytchSession();

  const uid = session?.user_id.charCodeAt(25); // for now to get a numeric uid instead of string
  console.log('user id', uid);

  if (!uid) {
    return <code>No Uid sad</code>;
  }

  return (
    <div id="App" style={{ display: 'flex' }}>
      <MenuBar uid={uid} />
      <div id="main-screen" style={{ flex: 1 }}>
        {inCall && roomInfo ? (
          <VideoCallPage uid={uid} roomInfo={roomInfo} setInCall={setInCall} />
        ) : (
          <Home uid={uid} setRoomInfo={setRoomInfo} setInCall={setInCall} />
        )}
      </div>
    </div>
  );
}

export default App;
