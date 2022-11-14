import React, { useEffect } from 'react';
import { useStytch, useStytchSession } from '@stytch/react';
import { useNavigate } from 'react-router-dom';

export default function Authenticate() {
  const stytchClient = useStytch();
  const { session } = useStytchSession();
  const navigate = useNavigate();
  const token = new URLSearchParams(window.location.search).get('token');
  if (token === null) {
    throw new Error('Token not found');
  }

  useEffect(() => {
    if (session) {
      navigate('/');
    } else {
      stytchClient.oauth.authenticate(token, {
        session_duration_minutes: 5,
      });
    }
  }, [stytchClient, session, navigate, token]);

  return (
    <>
      <h1>Loading...</h1>
      <p>Please wait while we log you in.</p>
    </>
  );
}
