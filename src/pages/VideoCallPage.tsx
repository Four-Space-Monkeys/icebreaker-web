import { IAgoraRTCRemoteUser } from 'agora-rtc-react';
import React, { useEffect, useState } from 'react';
import VideoCall from '../components/VideoCall/index';
import {
  config,
  useClient,
  useMicrophoneAndCameraTracks,
  channelName,
} from '../utils/settings';

interface Props {
  setInCall: (inCall: boolean) => void;
}
// entry point for the video call
// make any fetches here
// we can show a loading page until there is a match.
// User can minimize the page until there is a match

function VideoCallPage({
  setInCall,
}: Props) {
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    const init = async (name: string) => {
      client.on(
        'user-published',
        async (user: IAgoraRTCRemoteUser, mediaType) => {
          await client.subscribe(user, mediaType);
          if (mediaType === 'video') setUsers((prevUsers) => [...prevUsers, user]);

          if (mediaType === 'audio') {
            if (!user.audioTrack) throw new Error('user.audioTrack is null');

            user.audioTrack.play();
          }
        },
      );
      client.on('user-unpublished', (user, mediaType) => {
        if (mediaType === 'audio' && user.audioTrack) user.audioTrack.stop();

        if (mediaType === 'video') {
          setUsers((prevUsers) => prevUsers.filter((u: IAgoraRTCRemoteUser) => u.uid !== user.uid));
        }
      });

      client.on('user-left', (user) => {
        setUsers((prevUsers) => prevUsers.filter((u: IAgoraRTCRemoteUser) => u.uid !== user.uid));
      });

      try {
        await client.join(config.appId, name, config.token, null);
      } catch (err) {
        console.log(err);
      }
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };
    if (ready && tracks) {
      try {
        init(channelName);
      } catch (err) {
        console.log(err);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelName, client, ready, tracks]);

  if (!tracks || tracks.length < 2) return <div>Loading Page Here...</div>;

  return (
    <VideoCall
      users={users}
      audioTrack={tracks[0]}
      videoTrack={tracks[1]}
      setInCall={setInCall}
      setStart={setStart}
    />
  );
}

export default VideoCallPage;
