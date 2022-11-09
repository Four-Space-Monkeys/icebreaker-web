import React, { useState } from 'react';
import Home from './pages/Home';
import VideoCallPage from './pages/VideoCallPage';

function App() {
  const [inCall, setInCall] = useState(false);
  const [start, setStart] = useState(false);

  return !(inCall && start) ? (
    <VideoCallPage
      users={[]}
      tracks={[]}
      setStart={setStart}
      setInCall={setInCall}
    />
  ) : (
    <Home />
  );
}

export default App;
