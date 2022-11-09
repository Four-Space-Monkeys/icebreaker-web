import React, { useState } from 'react';
import { io } from 'socket.io-client';

function enterQueue(uid: string, onMatchCallback: Function) {
  const socket = io('http://localhost:7777/');

  socket.emit('add-uid-to-queue', uid);

  socket.on('match-found', (matchedUid) => {
    onMatchCallback(matchedUid);
  });
}

function Home() {
  const [uid, setUid] = useState('');
  const [inQueue, setInQueue] = useState(false);

  return (
    <div>
      {/* temporary input for uid until it gets passed as prop from login */}
      <input
        type="text"
        onChange={(e) => setUid(e.target.value)}
        value={uid}
        placeholder="set unique user id"
      />
      <button
        type="button"
        disabled={inQueue}
        onClick={() => {
          if (!uid) return;
          setInQueue(true);
          enterQueue(uid, (matchedUid: string) => {
            setInQueue(false);
            console.log(`matched with ${matchedUid}`); // eslint-disable-line no-console
            // whatever is supposed to happen after a match is found
          });
        }}
      >
        Join Call
      </button>
    </div>
  );
}

export default Home;
