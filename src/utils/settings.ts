import { ClientConfig, createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react';

export const appId = 'fa323ca5d3424215b779d506b86db346';
export const token = '007eJxTYHA4kl+36aoTm/TivHZ2swVsRjMdT935ILj+1oOle6eVxwcrMKQlGhsZJyeaphibGJkYGZommZtbppgamCVZmKUkGZuYPb2dlNwQyMgw/ec3FkYGCATxWRkc0/OLEhkYAHNcINY=';

export const config: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8',
};

export const channelName = 'Agora';
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
