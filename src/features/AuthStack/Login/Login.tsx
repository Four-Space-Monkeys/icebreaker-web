/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStytch } from '@stytch/react';

// Components
import { Typography, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';

// Images / Styling
import { Fade } from 'react-awesome-reveal';
import styles from '../Auth.module.scss';
import Logo from '../../../assets/logos/Logo.png';
import TextLogo from '../../../assets/logos/icebreaker-text-logo.png';

type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const [submitting, setSubmitting] = useState(false);
  const stytchClient = useStytch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  async function processSubmit(data: FormValues) {
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
    } catch (err: any) {
      if (err.status_code === 404) {
        alert('Email not found, please create an account.');
      }
      if (err.status_code === 401) {
        alert('Sorry, the password was incorrect.');
      }
      console.log('There was an Error', err);
    }
    setSubmitting(false);
  }

  async function linkedinOAuth() {
    stytchClient.oauth.linkedin.start({
      login_redirect_url: 'http://localhost:3000/authenticate',
      signup_redirect_url: 'http://localhost:3000/authenticate',
    });
  }

  return (
    <Fade direction="left">
      <div className={styles.rootContainer}>
        <form className={styles.form} onSubmit={handleSubmit(processSubmit)}>
          <div className={styles.interiorContainer}>
            <img src={Logo} className={styles.logoImage} alt="IceBreaker Logo" />
            <img src={TextLogo} className={styles.textImage} alt="IceBreaker" />
            <Typography className={styles.h1} sx={{ marginBottom: 3, marginTop: 6 }}>
              Login to IceBreaker
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
              className={styles.button}
              onClick={handleSubmit(processSubmit)}
              sx={{ marginTop: 3 }}
            >
              Log in
            </LoadingButton>
            <LoadingButton
              variant="contained"
              fullWidth
              size="large"
              className={styles.button}
              onClick={() => linkedinOAuth()}
              sx={{ marginTop: 1, marginBottom: 1 }}
            >
              Log in with LinkedIn
            </LoadingButton>
            <Typography className={styles.font1} sx={{ marginRight: 0.8 }}>
              Forgot your password?
              <Link className="link" to="/reset-password">
                Reset it here
              </Link>
            </Typography>
            <Typography className={styles.font1} sx={{ marginRight: 0.8 }}>
              Not yet registered?
              <Link className="link" to="/register">
                Sign up
              </Link>
            </Typography>
          </div>
          <Typography sx={{ marginTop: 1 }}>Powered by IceBreaker</Typography>
        </form>
      </div>
    </Fade>
  );
}
