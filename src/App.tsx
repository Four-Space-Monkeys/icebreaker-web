import React, { useEffect, useState } from 'react';
import { useStytchSession } from '@stytch/react';
import { BarLoader } from 'react-spinners';
import axios from 'axios';
import MenuBar from './layout/menubar/MenuBar';
import VideoCallPage from './pages/VideoCallPage';
import { RoomInfo, User } from './types';
import QueuePage from './pages/QueuePage';

function App() {
  const [user, setUser] = useState<undefined | User>(undefined);
  const { session } = useStytchSession();
  const [roomInfo, setRoomInfo] = useState<undefined | RoomInfo>(undefined);
  const [inCall, setInCall] = useState(false);

  useEffect(() => {
    if (user === undefined) {
      const stytchId = session?.user_id;

      if (!stytchId) {
        throw new Error('stytch id not found');
      }

      axios.get(`http://localhost:8080/users/${stytchId}`)
        .then(({ data }) => setUser(data))
        .catch(() => { throw new Error('couldn\'t find user'); });
    }
  }, [session?.user_id, user]);

  return (
    user === undefined ? (
      // idk if we should even have this, the user fetch happens so quickly that its just a flash
      // i'll leave it for now
      <BarLoader />
    ) : (
      <div id="App" style={{ display: 'flex' }}>
        <MenuBar uid={user.id} />
        <div id="main-screen" style={{ flex: 1 }}>
          {inCall && roomInfo ? (
            <VideoCallPage uid={user.id} roomInfo={roomInfo} setInCall={setInCall} />
          ) : (
            <QueuePage
              uid={user.id}
              firstName={user.firstName}
              interests={user.interests}
              setRoomInfo={setRoomInfo}
              setInCall={setInCall}
            />
          )}
        </div>
      </div>
    )
  );
}

export default App;
