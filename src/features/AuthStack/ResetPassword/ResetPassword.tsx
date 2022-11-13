/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStytch } from '@stytch/react';
import { TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
// images / Styles

// const Fade = require('react-reveal/Fade');

export default function ResetPassword() {
  const [submitting, setSubmitting] = useState(false);
  const stytchClient = useStytch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function processSubmit(data) {
    const email = data.email.toLowerCase();
    console.log('email', email);

    setSubmitting(true);
    try {
      const resp = await stytchClient.passwords.resetByEmailStart({
        email,
      });
      console.log('Check your Email', resp);
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
          <Typography className="h1" sx={{ marginBottom: 3, marginTop: 6 }}>
            Reset Your Password
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
          <input type="submit" style={{ display: 'none' }} />
          <LoadingButton
            variant="contained"
            fullWidth
            size="large"
            loading={submitting}
            onClick={handleSubmit(processSubmit)}
            sx={{ marginTop: 3, marginBottom: 1 }}
          >
            Send Reset Email
          </LoadingButton>
          <Typography className="font1" sx={{ marginRight: 0.8 }}>
            Remember your password?
            <Link className="link" to="/">
              Login here.
            </Link>
          </Typography>
          <Typography className="font1" sx={{ marginRight: 0.8 }}>
            Not yet Registered?
            <Link className="link" to="/register">
              Sign up.
            </Link>
          </Typography>
        </div>
        <Typography sx={{ marginTop: 1 }}>Powered by Ice Breaker</Typography>
      </form>
      {/* </Fade> */}
    </div>
  );
}
