/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

// Components
import { Typography, TextField, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link, useNavigate } from 'react-router-dom';

// Images / Styling
import './Login.css';
import Logo from '../../../assets/logos/IBLogo.png';

const Fade = require('react-reveal/Fade');

export default function Login() {
  const [submitting, setSubmitting] = useState(false);
  // const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function processSubmit(data) {
    console.log('data', data.email);
    console.log('password', data.password);
    const email = data.email.toLowerCase();
    const { password } = data;
    setSubmitting(true);
    try {
      await axios
        .post('http://localhost:3001/login', { email, password })
        .then((res) => {
          console.log('You Signed In', res);
          setSubmitting(false);
          // Return and update the state, Within Authorizer, we will use useEffect
          // and check if user has changed, based on that we will route the page.
          // Might be able to do this under Router instead of Authorizer?
        });
    } catch (err) {
      console.log( 'There was an error', err);
      setSubmitting(false);
    }
  }

  return (
    <div className="rootContainer">
      <Fade top>
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
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
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
              // loadingPosition={'end'}
              onClick={handleSubmit(processSubmit)}
              sx={{ marginTop: 3 }}
            >
              Log in
            </LoadingButton>
            <LoadingButton
              variant="contained"
              fullWidth
              size="large"
              loading={submitting}
              // loadingPosition={'end'}
              onClick={handleSubmit(processSubmit)}
              sx={{ marginTop: 1, marginBottom: 1 }}
            >
              Log in with LinkedIn
            </LoadingButton>
            <Typography className="font1" sx={{ marginRight: 0.8 }}>
              Forgot your password?{' '}
              <Link className="link" to="/forgot-password">
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
      </Fade>
    </div>
  );
}
