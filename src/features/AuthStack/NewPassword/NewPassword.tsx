/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
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
  password: string;
};

export default function NewPassword() {
  const stytchClient = useStytch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const token = new URLSearchParams(window.location.search).get('token');
  if (token === null) {
    throw new Error('Token not found');
  }

  const resetPassword = useCallback(
    (data: FormValues) => {
      const { password } = data;
      stytchClient.passwords.resetByEmail({
        token,
        password,
        session_duration_minutes: 360,
      });
    },
    [stytchClient, token],
  );

  return (
    <Fade>
      <div className={styles.rootContainer}>
        <form className={styles.form} onSubmit={handleSubmit(resetPassword)}>
          <div className={styles.interiorContainer}>
            <img src={Logo} className={styles.logoImage} alt="IceBreaker Logo" />
            <img src={TextLogo} className={styles.textImage} alt="IceBreaker" />
            <Typography className={styles.h1} sx={{ marginBottom: 3, marginTop: 6 }}>
              Reset Your Password
            </Typography>
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
              className={styles.button}
              onClick={handleSubmit(resetPassword)}
              sx={{ marginTop: 3, marginBottom: 1 }}
            >
              Submit New Password
            </LoadingButton>
            <Typography className={styles.font1} sx={{ marginRight: 0.8 }}>
              Remember your password?
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
