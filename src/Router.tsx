import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import Snackbar from './components/Widgets/Snackbar';
import Authorizer from './Authorizer';
// import IntroResponse from 'containers/Other/IntroResponse';

function Router(props) {
  return (
    <>
      {/* <Snackbar /> */}
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Authorizer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
