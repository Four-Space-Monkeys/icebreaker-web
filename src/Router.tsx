import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Authorizer from './Authorizer';
import Login from './components/AuthStack/Login/Login';
import Register from './components/AuthStack/Register/Register';
import Home from './components/Home';

function Router(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/authenticate" element={<Authorizer />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
