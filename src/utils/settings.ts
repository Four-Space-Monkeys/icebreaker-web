import { ClientConfig, createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react';

// if (!process.env.AGORA_APP_ID) {
//   throw new Error('Please provide an Agora App ID in the .env file.');
// }

export const appId = 'fa323ca5d3424215b779d506b86db346';

export const config: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8',
};

export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
