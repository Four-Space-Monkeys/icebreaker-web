import React, { useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useStytch } from '@stytch/react';
import { RoomInfo } from '../types';

function enterQueue(uid: string, onMatchCallback: Function) {
  const socket = io('http://localhost:7777/');

  socket.emit('add-uid-to-queue', uid);

  socket.on('match-found', (matchedUid) => {
    onMatchCallback(matchedUid);
  });
}

function Home({
  uid,
  setRoomInfo,
  setInCall,
}: {
  uid: undefined | number;
  setRoomInfo: React.Dispatch<React.SetStateAction<RoomInfo | undefined>>;
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [inQueue, setInQueue] = useState(false);

  const client = useStytch();

  const handleLogout = useCallback(async () => {
    await client.session.revoke();
    alert('Logged Out!');
  }, [client]);

  return (
    <div>
      <button
        type="button"
        disabled={inQueue}
        onClick={() => {
          if (!uid) return;
          setInQueue(true);
          enterQueue(uid.toString(), (matchInfo: string) => {
            setInQueue(false);
            setRoomInfo(JSON.parse(matchInfo));
            setInCall(true);
          });
        }}
      >
        Join Call
      </button>
      <button type="button" onClick={handleLogout}> Logout </button>
    </div>
  );
}

export default Home;
