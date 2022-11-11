import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import Snackbar from './components/Widgets/Snackbar';
import Authorizer from './Authorizer';
import Login from './components/AuthStack/Login/Login';
// import IntroResponse from 'containers/Other/IntroResponse';

function Router(props) {
  return (
    <>
      {/* <Snackbar /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
