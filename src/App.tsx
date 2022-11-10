import React, { useState } from 'react';
import Home from './pages/Home';
import VideoCallPage from './pages/VideoCallPage';

function App() {
  const [inCall, setInCall] = useState(false);

  return !(inCall) ? (
    <VideoCallPage
      setInCall={setInCall}
    />
  ) : (
    <Home />
  );
}

export default App;
