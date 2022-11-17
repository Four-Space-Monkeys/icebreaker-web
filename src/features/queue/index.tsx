import React, { useState } from 'react';
import { BarLoader } from 'react-spinners';
import { io, Socket } from 'socket.io-client';
import { Interest, RoomInfo } from '../../types';
import InterestList from './components/InterestList';
import QueueControls from './components/QueueControls';
import styles from './components/queue.module.scss';

let socket: Socket | undefined;

function Queue({
  uid,
  firstName,
  interests,
  setRoomInfo,
  setInCall,
}: {
  uid: number;
  firstName: string;
  interests: Interest[];
  setRoomInfo: React.Dispatch<React.SetStateAction<RoomInfo | undefined>>;
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [inQueue, setInQueue] = useState(false);
  const [selectedInterestIds, setSelectedInterestIds] = useState<number[]>([]);

  function exitQueue() {
    setInQueue(false);

    if (!socket) { return; }

    socket.disconnect();
    socket = undefined;
  }

  function joinQueue() {
    setInQueue(true);

    socket = io('http://localhost:7777/');

    socket.emit('join-queue', {
      uid,
      firstName,
      selectedInterestIds,
    });

    socket.on('match-found', ({
      token,
      channel,
      matchFirstName,
      matchInterestId,
    }: {
      token: string;
      channel: string;
      matchFirstName: string;
      matchInterestId: number;
    }) => {
      exitQueue();
      const roomInfo: RoomInfo = {
        token,
        channel,
        matchFirstName,
        // should always find the interest here,
        // as user queues from their own selected interests in the first place
        interest: interests.find(({ id }) => id === matchInterestId)?.name || 'interest not found',
      };
      console.log(roomInfo); // eslint-disable-line no-console
      setRoomInfo(roomInfo);
      setInCall(true);
    });
  }

  return (
    <div className={styles.queueContainer}>
      <InterestList
        inQueue={inQueue}
        interests={interests}
        selectedInterestIds={selectedInterestIds}
        setSelectedInterestIds={setSelectedInterestIds}
      />
      <QueueControls
        inQueue={inQueue}
        // use some error popup npm package to say 'select interest to join queue' instead of
        // doing nothing on click
        joinQueue={selectedInterestIds.length !== 0 ? () => joinQueue() : undefined}
        exitQueue={() => exitQueue()}
      />
      {inQueue && (
        <BarLoader />
      )}
    </div>
  );
}

export default Queue;
