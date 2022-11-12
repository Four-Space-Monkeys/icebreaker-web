import React, { useEffect } from 'react';
import { useStytch, useStytchSession } from '@stytch/react';
import { useNavigate } from 'react-router-dom';
import Auth from './components/AuthStack/Auth';
import Home from './components/UserStack/Home';

export default function Authorizer() {
  const client = useStytch();
  const session = useStytchSession();
  const navigate = useNavigate();

  let routes;

  // useEffect(() => {
  //   if (session) {
  //     window.location.href = 'https://localhost:3000/';
  //   } else {
  //     const token = new URLSearchParams(window.location.search).get('token');
  //     client.oauth.authenticate(token, {
  //       session_duration_minutes: 5,
  //     });
  //   }
  // }, [client, session]);

  const token = new URLSearchParams(window.location.search).get('token');
  if (token) {
    client.oauth.authenticate(token, {
      session_duration_minutes: 5,
    });
  } else if (!session?.user_id) {
    routes = <Auth />;
  } else {
    routes = <Home />;
  }

  return routes;
}
