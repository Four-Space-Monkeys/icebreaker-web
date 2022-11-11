import React, { useState } from 'react';
import Home from './pages/Home';
import VideoCallPage from './pages/VideoCallPage';
import { RoomInfo } from './types';

function App() {
  const [uid, setUid] = useState<undefined | number>(undefined);
  const [roomInfo, setRoomInfo] = useState<undefined | RoomInfo>(undefined);
  const [inCall, setInCall] = useState(false);

  return inCall && roomInfo && uid ? (
    <VideoCallPage
      uid={uid}
      roomInfo={roomInfo}
      setInCall={setInCall}
    />
  ) : (
    <Home
      uid={uid}
      setUid={setUid}
      setRoomInfo={setRoomInfo}
      setInCall={setInCall}
    />
  );
}

export default App;
