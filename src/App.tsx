import React, { useState } from 'react';
import { useStytchSession } from '@stytch/react';
import MenuBar from './layout/menubar/MenuBar';
import Home from './pages/Home';
import VideoCallPage from './pages/VideoCallPage';
import styles from './layout/menubar/MenuBar.module.scss';
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
    <div id="App" className={styles.app}>
      <MenuBar uid={uid} />
      <div id="main-screen" className={styles.mainScreen}>
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
