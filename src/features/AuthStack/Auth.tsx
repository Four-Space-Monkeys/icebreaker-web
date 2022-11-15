import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// Pages
import Login from './Login/Login';
import Register from './Register/Register';
import ResetPassword from './ResetPassword/ResetPassword';
import NewPassword from './NewPassword/NewPassword';

export default function Auth() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
}
