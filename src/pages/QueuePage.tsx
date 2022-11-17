import React from 'react';
import Queue from '../features/queue';
import { Interest, RoomInfo } from '../types';

function QueuePage({
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
  return (
    <Queue
      uid={uid}
      firstName={firstName}
      interests={interests}
      setRoomInfo={setRoomInfo}
      setInCall={setInCall}
    />
  );
}

export default QueuePage;
