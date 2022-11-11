import { ClientConfig, createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react';

export const appId = '8288b06f9d464f718a7b6264a92d6207';

export const config: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8',
};

export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
