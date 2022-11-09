import React, { useState } from 'react';
import VideoCallPage from './components/VideoCall';

function App() {
  const [inCall, setInCall] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);
  return (
    <div>
      Ice Breaker
      <VideoCallPage
        users={[]}
        tracks={[]}
        setStart={setStart}
        setInCall={setInCall}
      />
    </div>
  );
}

export default App;
