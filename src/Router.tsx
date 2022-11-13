import React from 'react';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import { useStytchSession } from '@stytch/react';
import Auth from './components/AuthStack/Auth';
import App from './App';

function Router() {
  // const client = useStytch();
  const { session } = useStytchSession();

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

  // const token = new URLSearchParams(window.location.search).get('token');
  // if (token) {
  //   client.oauth.authenticate(token, {
  //     session_duration_minutes: 5,
  //   });
  // } else

  return (
    <BrowserRouter>
      <Routes>
        {!session?.user_id && <Route path="*" element={<Auth />} />}
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
