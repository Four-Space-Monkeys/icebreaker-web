import { createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react';

const appId = 'fa323ca5d3424215b779d506b86db346';
const token = '007eJxTYHA4kl+36aoTm/TivHZ2swVsRjMdT935ILj+1oOle6eVxwcrMKQlGhsZJyeaphibGJkYGZommZtbppgamCVZmKUkGZuYPb2dlNwQyMgw/ec3FkYGCATxWRkc0/OLEhkYAHNcINY=';

export const config = {
  mode: 'rtc',
  codec: 'vp8',
  appId,
  token,
};

export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = 'Agora';
