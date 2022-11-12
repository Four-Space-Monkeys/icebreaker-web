import React, { useEffect } from 'react';
import { useStytch, useStytchSession } from '@stytch/react';

export default function authenticate() {
  const stytchClient = useStytch();
  const { session } = useStytchSession();

  useEffect(() => {
    if (session) {
      window.location.href = 'https://example.com/profile';
    } else {
      const token = new URLSearchParams(window.location.search).get('token');
      stytchClient.oauth.authenticate(token, {
        session_duration_minutes: 60,
      });
    }
  }, [stytchClient, session]);

  return <div>Loading</div>;
};

