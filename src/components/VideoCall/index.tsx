import React, { useEffect } from 'react';
import { IAgoraRTCRemoteUser, ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-react';
import Controls from './components/Controls';
import User from './components/User';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100%',
    maxWidth: '800px',
    outline: '10px solid black',
    margin: '0 auto',
  },
  'no-user': {
    flex: 1,
    backgroundColor: 'skyblue',
    zIndex: 1,
    width: '100%',
  },
};

interface IVideoCallProps {
  users: IAgoraRTCRemoteUser[];
  audioTrack: IMicrophoneAudioTrack;
  videoTrack: ICameraVideoTrack;
  setStart: (start: boolean) => void;
  setInCall: (inCall: boolean) => void;
}
//
// we can add chat here as well
function VideoCall({
  users,
  audioTrack,
  videoTrack,
  setInCall,
  setStart,
}: IVideoCallProps) {
  useEffect(() => {
    // setGridSpacing(Math.max(Math.floor(12 / (users?.length || 0 + 1)), 4));
  }, [users, audioTrack, videoTrack]);

  return (
    <div style={styles.container}>
      <h2>VideoCall</h2>
      <div id="video-ctn" style={styles.container}>
        {!videoTrack ? (
          <User videoTrack={videoTrack} />
        ) : (
          <div style={styles['no-user']}> No Client </div>
        )}
        {users.length > 0 ? (
          users.map((user) => (
            <User key={user.uid} videoTrack={user.videoTrack} />
          ))
        ) : (
          <div style={styles['no-user']}> No User </div>
        )}
      </div>
      <Controls
        audioTrack={audioTrack}
        videoTrack={videoTrack}
        setStart={setStart}
        setInCall={setInCall}
      />
    </div>
  );
}

export default VideoCall;
