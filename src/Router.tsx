import React from 'react';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import { useStytchSession } from '@stytch/react';
import Auth from './features/AuthStack/Auth';
import App from './App';
import Authenticate from './pages/Authenticate';
import RegisterForm from './pages/RegisterForm';

function Router() {
  const { session } = useStytchSession();

  return (
    <BrowserRouter>
      <Routes>
        {!session?.user_id && <Route path="*" element={<Auth />} />}
        <Route path="*" element={<App />} />
        <Route path="/authenticate" element={<Authenticate />} />
        <Route path="/register-form" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
