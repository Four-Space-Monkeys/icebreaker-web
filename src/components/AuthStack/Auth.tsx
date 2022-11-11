import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// Pages
import Login from './Login/Login';
import Register from './Register/Register';

export default function Auth() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
}
