/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStytch } from '@stytch/react';
// import { OAuthProviders } from '@stytch/vanilla-js';
// import { StytchLogin } from '@stytch/react';

// Components
import { Typography, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';

// Images / Styling
import './Login.css';
import Logo from '../../../assets/logos/IBLogo.png';

// const Fade = require('react-reveal/Fade');

export default function Login() {
  const [submitting, setSubmitting] = useState(false);
  const stytchClient = useStytch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function processSubmit(data: any) {
    const email = data.email.toLowerCase();
    const { password } = data;
    setSubmitting(true);
    try {
      const resp = await stytchClient.passwords.authenticate({
        email,
        password,
        session_duration_minutes: 1000,
      });
      console.log('You logged in successfully', resp);
    } catch (err) {
      console.log('There was an Error', err);
    }
    setSubmitting(false);
  }

  async function linkedinOAuth() {
    stytchClient.oauth.linkedin.start({
      login_redirect_url: 'http://127.0.0.1:3000/',
      signup_redirect_url: 'http://127.0.0.1:3000/',
    });
  }

  // const stytchProps = {
  //   config: {
  //     products: ['oauth'],
  //     oauthOptions: {
  //       providers: [{ type: OAuthProviders.LinkedIn }],
  //     },
  //   },
  // };

  //   function OAuthStartButton() {
  //   const stytch = useStytch();
  //   const startOAuthFlow = useCallback(() => stytch.oauth.google.start({
  //     login_redirect_url: 'https://example.com/callback',
  //     signup_redirect_url: 'https://example.com/callback',
  //     custom_scopes: ['https://www.googleapis.com/auth/calendar']
  //   }), [stytch])

  //   return (
  //     <button onClick={startOAuthFlow}>
  //       Click here to log in with Google
  //     </button>
  //   );
  // }

  return (
    <div className="rootContainer">
      {/* <Fade top> */}
      <form className="form" onSubmit={handleSubmit(processSubmit)}>
        <div className="loginContainer">
          <img src={Logo} className="logoImage" alt="Ice Breaker" />
          <Typography className="h1" sx={{ marginBottom: 3, marginTop: 6 }}>
            Login to Ice Breaker
          </Typography>
          <TextField
            error={!!errors.email}
            label="Email"
            fullWidth
            size="small"
            {...register('email', {
              required: true,
              pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            error={!!errors.password}
            label="Password"
            fullWidth
            type="password"
            size="small"
            {...register('password', {
              required: true,
              pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}/,
            })}
          />

          <input type="submit" style={{ display: 'none' }} />
          <LoadingButton
            variant="contained"
            fullWidth
            size="large"
            loading={submitting}
            onClick={handleSubmit(processSubmit)}
            sx={{ marginTop: 3 }}
          >
            Log in
          </LoadingButton>
          {/* <div>
            <StytchLogin config={stytchProps.config} />
          </div> */}
          <LoadingButton
            variant="contained"
            fullWidth
            size="large"
            onClick={() => linkedinOAuth}
            sx={{ marginTop: 1, marginBottom: 1 }}
          >
            Log in with LinkedIn
          </LoadingButton>
          <Typography className="font1" sx={{ marginRight: 0.8 }}>
            Forgot your password?{' '}
            <Link className="link" to="/reset-password">
              Reset it here
            </Link>
          </Typography>
          <Typography className="font1" sx={{ marginRight: 0.8 }}>
            Not yet registered?{' '}
            <Link className="link" to="/register">
              Sign up
            </Link>
          </Typography>
        </div>
        <Typography sx={{ marginTop: 1 }}>Powered by Ice Breaker</Typography>
      </form>
      {/* </Fade> */}
    </div>
  );
}
