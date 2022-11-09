import React, { useEffect } from 'react';
import VideoCall from '../components/VideoCall/index';

interface IUser {
  uid: number;
  videoTrack: any;
}

interface Props {
  users: IUser[];
  tracks: any[];
  setStart: (start: boolean) => void;
  setInCall: (inCall: boolean) => void;
}
// entry point for the video call
// make any fetches here
// we can show a loading page until there is a match.
// User can minimize the page until there is a match

function VideoCallPage({
  users, tracks, setStart, setInCall,
}: Props) {
  // const [gridSpacing, setGridSpacing] = useState(12);
  // user should be able to leave the video call
  // also change rooms eventually
  // and be redirected to the home page
  useEffect(() => {
    // setGridSpacing(Math.max(Math.floor(12 / (users?.length || 0 + 1)), 4));
  }, [users, tracks]);

  // if (users.length === 0) return <div>Loading Page Here...</div>;

  return (
    <VideoCall
      users={users}
      tracks={tracks}
      setInCall={setInCall}
      setStart={setStart}
    />
  );
}

export default VideoCallPage;
