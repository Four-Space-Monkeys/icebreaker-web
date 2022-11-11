import React, { useState } from 'react';
import { io } from 'socket.io-client';
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
  setUid,
  setRoomInfo,
  setInCall,
}: {
  uid: undefined | number;
  setUid: React.Dispatch<React.SetStateAction<number | undefined>>;
  setRoomInfo: React.Dispatch<React.SetStateAction<RoomInfo | undefined>>;
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [inQueue, setInQueue] = useState(false);

  return (
    <div>
      {/* temporary input for uid until it gets passed from login */}
      <input
        type="text"
        onChange={(e) => setUid(Number(e.target.value))}
        value={uid || ''}
        placeholder="set unique user id"
      />
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
    </div>
  );
}

export default Home;
