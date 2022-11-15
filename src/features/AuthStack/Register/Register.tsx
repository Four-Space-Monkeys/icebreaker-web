/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStytch } from '@stytch/react';
import { TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
// images / Styles
import Logo from '../../../assets/logos/IBLogo.png';

// const Fade = require('react-reveal/Fade');

type FormValues = {
  email: string;
  password: string;
};

export default function Register() {
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
    // console.log('data', data.email);
    // console.log('password', password);

    setSubmitting(true);
    try {
      const resp = await stytchClient.passwords.create({
        email,
        password,
        session_duration_minutes: 1000,
      });
      console.log('You registered successfully', resp);
    } catch (err) {
      console.log('There was an Error', err);
    }
    setSubmitting(false);
  }

  return (
    <div className="rootContainer">
      {/* <Fade top> */}
      <form className="form" onSubmit={handleSubmit(processSubmit)}>
        <div className="registerContainer">
          <img src={Logo} className="logoImage" alt="Ice Breaker" />
          <Typography className="h1" sx={{ marginBottom: 3, marginTop: 6 }}>
            Sign up to start your Ice Breaker experience!
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
            helperText="Minimum 8 characters, 1 lowercase, 1 uppercase and 1 number."
          />

          <input type="submit" style={{ display: 'none' }} />
          <LoadingButton
            variant="contained"
            fullWidth
            size="large"
            loading={submitting}
            // loadingPosition={'end'}
            onClick={handleSubmit(processSubmit)}
            sx={{ marginTop: 3, marginBottom: 1 }}
          >
            Register
          </LoadingButton>
          <Typography className="font1" sx={{ marginRight: 0.8 }}>
            Already registered?{' '}
            <Link className="link" to="/login">
              Login here.
            </Link>
          </Typography>
        </div>
        <Typography sx={{ marginTop: 1 }}>Powered by Ice Breaker</Typography>
      </form>
      {/* </Fade> */}
    </div>
  );
}
