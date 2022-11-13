import React from 'react';
import ReactDOM from 'react-dom/client';
import { StytchProvider } from '@stytch/react';
import { StytchUIClient } from '@stytch/vanilla-js';
import Router from './Router';
import reportWebVitals from './utils/reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const stytch = new StytchUIClient(
  process.env.STYTCH_TOKEN,
);

root.render(
  <React.StrictMode>
    <StytchProvider stytch={stytch}>
      <Router />
    </StytchProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
