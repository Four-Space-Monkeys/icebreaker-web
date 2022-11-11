import React from 'react';
import ReactDOM from 'react-dom/client';
import { StytchProvider } from '@stytch/stytch-react';
import { StytchUIClient } from '@stytch/vanilla-js';
import App from './App';
import reportWebVitals from './utils/reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const stytch = new StytchUIClient(
  'public-token-test-3880a37c-4d7a-4fc2-a758-eefc0c4a2ef7',
);
// Store in a .env file later

root.render(
  <React.StrictMode>
    <StytchProvider stytch={stytch}>
      <App />
    </StytchProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
