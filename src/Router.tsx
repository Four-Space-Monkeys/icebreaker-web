import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Authorizer from './Authorizer';

function Router(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Authorizer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
