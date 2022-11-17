/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStytch } from '@stytch/react';
import { TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
// images / Styles
import { Fade } from 'react-awesome-reveal';
import styles from '../auth.module.scss';
import Logo from '../../../assets/logos/Logo.png';
import TextLogo from '../../../assets/logos/icebreaker-text-logo.png';

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

    setSubmitting(true);
    try {
      const resp = await stytchClient.passwords.create({
        email,
        password,
        session_duration_minutes: 1000,
      });
      console.log('You registered successfully', resp);
    } catch (err: any) {
      if (err.error_type === 'duplicate_email') {
        alert('Sorry, this email already exists.');
      }
      console.log('There was an Error', err);
    }
    setSubmitting(false);
  }

  return (
    <Fade direction="down">
      <div className={styles.rootContainer}>
        <form className={styles.form} onSubmit={handleSubmit(processSubmit)}>
          <div className={styles.interiorContainer}>
            <img src={Logo} className={styles.logoImage} alt="IceBreaker Logo" />
            <img src={TextLogo} className={styles.textImage} alt="IceBreaker" />
            <Typography
              className={styles.h1}
              sx={{ marginBottom: 3, marginTop: 6 }}
            >
              Sign up to start your IceBreaker experience!
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
              className={styles.button}
              onClick={handleSubmit(processSubmit)}
              sx={{ marginTop: 3, marginBottom: 1 }}
            >
              Register
            </LoadingButton>
            <Typography className={styles.font1} sx={{ marginRight: 0.8 }}>
              Already registered?
              <Link className="link" to="/login">
                Login here.
              </Link>
            </Typography>
          </div>
          <Typography sx={{ marginTop: 1 }}>Powered by IceBreaker</Typography>
        </form>
      </div>
    </Fade>
  );
}
