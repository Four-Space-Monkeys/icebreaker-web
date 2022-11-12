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

  if (!session?.user_id) {
    routes = <Auth />;
  } else {
    routes = <Home />;
  }

  return routes;
}
