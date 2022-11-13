import React, { useState } from 'react';
import Home from './pages/Home';
import TempLogin from './pages/TempLogin';
import VideoCallPage from './pages/VideoCallPage';
import { RoomInfo } from './types';

// only renders Authorizer.tsx

function App() {
  const [uid, setUid] = useState<undefined | number>(undefined);
  const [roomInfo, setRoomInfo] = useState<undefined | RoomInfo>(undefined);
  const [inCall, setInCall] = useState(false);

  if (uid === undefined) {
    return <TempLogin setUid={setUid} />;
  }

  return inCall && roomInfo ? (
    <VideoCallPage
      uid={uid}
      roomInfo={roomInfo}
      setInCall={setInCall}
    />
  ) : (
    <Home
      uid={uid}
      setRoomInfo={setRoomInfo}
      setInCall={setInCall}
    />
  );
}

export default App;
