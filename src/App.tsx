import React from 'react';
import VideoCallPage from './components/VideoCall';

function App() {
  return (
    <div>
      Ice Breaker
      <VideoCallPage users={[]} tracks={[]} />
    </div>
  );
}

export default App;
