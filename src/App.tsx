import React, { useEffect, useState } from 'react';
import { useStytchSession } from '@stytch/react';
import { BarLoader } from 'react-spinners';
import axios from 'axios';
import MenuBar from './layout/menubar/MenuBar';
import VideoCallPage from './pages/VideoCallPage';
import { RoomInfo, User } from './types';
import QueuePage from './pages/QueuePage';
import RegisterForm from './pages/RegisterForm';

function App() {
  const [user, setUser] = useState<undefined | User>(undefined);
  const { session } = useStytchSession();
  const [roomInfo, setRoomInfo] = useState<undefined | RoomInfo>(undefined);
  const [inCall, setInCall] = useState(false);
  const [registerCheck, setRegisterCheck] = useState(false);

  useEffect(() => {
    if (user === undefined) {
      const stytchId = session?.user_id;

      if (!stytchId) {
        throw new Error('stytch id not found');
      }

      axios
        .get(`http://localhost:8080/users/${stytchId}`)
        .then(({ data }) => setUser(data))
        .catch((err) => {
          if (err.response.status === 404) {
            setRegisterCheck(true);
          }
          // throw new Error("couldn't find user");
        });
    }
  }, [session?.user_id, user]);

  const userAuth = user === undefined ? (
    <div>
      <BarLoader />
    </div>
  ) : (
    <div id="App" style={{ display: 'flex' }}>
      <MenuBar uid={user.id} />
      <div id="main-screen" style={{ flex: 1 }}>
        {inCall && roomInfo ? (
          <VideoCallPage
            uid={user.id}
            roomInfo={roomInfo}
            setInCall={setInCall}
          />
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
  );

  console.log('register', registerCheck);

  return registerCheck ? (
    <div>
      <RegisterForm />
    </div>
  ) : (
    userAuth
  );
}

export default App;
