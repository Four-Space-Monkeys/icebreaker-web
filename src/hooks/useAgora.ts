import React, { useEffect } from 'react';

// custom hook for agora listener
const useAgora = (client, channelName, token) => {
  useEffect(() => {}, [client, channelName, token]);
  return [client, channelName, token];
};

export default useAgora;
