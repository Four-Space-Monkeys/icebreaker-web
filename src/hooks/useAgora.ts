import { IAgoraRTCRemoteUser } from 'agora-rtc-react';
import { useEffect, useState } from 'react';
import { useClient, useMicrophoneAndCameraTracks, appId } from '../utils/settings';

// custom hook for agora listener
const useAgora = (uid: number, channelName: string, token: string) => {
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      client.on(
        'user-published',
        async (user: IAgoraRTCRemoteUser, mediaType) => {
          await client.subscribe(user, mediaType);
          if (mediaType === 'video') {
            setUsers((prevUsers) => [...prevUsers, user]);
          }

          if (mediaType === 'audio') {
            if (!user.audioTrack) throw new Error('user.audioTrack is null');
            user.audioTrack.play();
          }
        },
      );

      client.on('user-unpublished', (user, mediaType) => {
        if (mediaType === 'audio' && user.audioTrack) user.audioTrack.stop();

        if (mediaType === 'video') {
          setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
        }
      });

      client.on('user-left', (user) => {
        setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
      });

      try {
        await client.join(appId, channelName, token, uid);
        if (tracks) await client.publish([tracks[0], tracks[1]]);
      } catch (err) {
        console.error(err); // eslint-disable-line no-console
      }

      setStart(true);
    };

    if (ready && tracks) {
      try {
        init();
      } catch (err) {
        console.error(err); // eslint-disable-line no-console
      }
    }
  }, [channelName, client, ready, token, tracks, uid]);

  return {
    start,
    setStart,
    audioTrack: tracks ? tracks[0] : null,
    videoTrack: tracks ? tracks[1] : null,
    users,
  };
};

export default useAgora;
