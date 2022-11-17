/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStytch } from '@stytch/react';
import { TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
// images / Styles
import { Fade } from 'react-awesome-reveal';
import styles from '../Auth.module.scss';
import Logo from '../../../assets/logos/Logo.png';
import TextLogo from '../../../assets/logos/icebreaker-text-logo.png';

type FormValues = {
  email: string;
};

export default function ResetPassword() {
  const [submitting, setSubmitting] = useState(false);
  const stytchClient = useStytch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  async function processSubmit(data: FormValues) {
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
    <Fade>
      <div className={styles.rootContainer}>
        <form className={styles.form} onSubmit={handleSubmit(processSubmit)}>
          <div className={styles.interiorContainer}>
            <img src={Logo} className={styles.logoImage} alt="IceBreaker Logo" />
            <img src={TextLogo} className={styles.textImage} alt="IceBreaker" />
            <Typography className={styles.h1} sx={{ marginBottom: 3, marginTop: 6 }}>
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
              className={styles.button}
              onClick={handleSubmit(processSubmit)}
              sx={{ marginTop: 3, marginBottom: 1 }}
            >
              Send Reset Email
            </LoadingButton>
            <Typography className={styles.font1} sx={{ marginRight: 0.8 }}>
              Remember your password?
              <Link className="link" to="/">
                Login here.
              </Link>
            </Typography>
            <Typography className={styles.font1} sx={{ marginRight: 0.8 }}>
              Not yet Registered?
              <Link className="link" to="/register">
                Sign up.
              </Link>
            </Typography>
          </div>
          <Typography sx={{ marginTop: 1 }}>Powered by IceBreaker</Typography>
        </form>
      </div>
    </Fade>
  );
}
