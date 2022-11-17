import React, { useEffect, useState } from 'react';
import { useStytchSession } from '@stytch/react';
import { BarLoader } from 'react-spinners';
import axios from 'axios';
import MenuBar from './layout/menubar/MenuBar';
import VideoCallPage from './pages/VideoCallPage';
import { RoomInfo, User } from './types';
import QueuePage from './pages/QueuePage';
import styles from './App.module.scss';

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
    <div id="App" className={styles.app}>
      <MenuBar />
      <div id="main-ctn" className={styles.mainCtn}>
        <div className={styles.mainView}>
          <VideoCallPage
            uid={6}
            roomInfo={{
              channel: 'test',
              token:
                '007eJxTYLCwFrfXnu8z6Y3Jle4Nb0wP7th8m8nmkHZOwq+sB9s6+0IVGNISjY2MkxNNU4xNjEyMDE2TzM0tU0wNzJIszFKSjE3MbEJKkxsCGRmM7r9hYWSAQBCfhaEktbiEgQEATNkflw==',
              interest: 'Software Engineering',
              matchFirstName: 'Heemo',
            }}
            setInCall={setInCall}
          />
        </div>
      </div>
    </div>
    // user === undefined ? (
    //   // idk if we should even have this, the user fetch happens so quickly that its just a flash
    //   // i'll leave it for now
    //   <BarLoader />
    // ) : (
  //  <div id="App" className={styles.app}>
    //     <MenuBar uid={user.id} />
    //     <div id="main-ctn" className={styles.mainCtn}>
    //      <div className={styles.mainView}>
    //       {inCall && roomInfo ? (
    //         <VideoCallPage uid={user.id} roomInfo={roomInfo} setInCall={setInCall} />
    //       ) : (
    //         <QueuePage
    //           uid={user.id}
    //           firstName={user.firstName}
    //           interests={user.interests}
    //           setRoomInfo={setRoomInfo}
    //           setInCall={setInCall}
    //         />
    //       )}
      // </div>
    //     </div>
    //   </div>
    // )
  );
}

export default App;
