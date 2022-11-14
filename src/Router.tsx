import React, { useEffect } from 'react';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import { useStytchSession, useStytch } from '@stytch/react';
import Auth from './features/AuthStack/Auth';
import App from './App';
import Authenticate from './pages/Authenticate';

function Router() {
  const { session } = useStytchSession();

  return (
    <BrowserRouter>
      <Routes>
        {!session?.user_id && <Route path="*" element={<Auth />} />}
        <Route path="*" element={<App />} />
        <Route path="/authenticate" element={<Authenticate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
