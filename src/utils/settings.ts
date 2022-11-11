import { ClientConfig, createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react';

export const appId = 'fe44932382c4452a8e692e262df2ea63';

export const config: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8',
};

export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
