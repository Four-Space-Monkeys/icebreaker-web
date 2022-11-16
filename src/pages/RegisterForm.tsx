import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStytch } from '@stytch/react';
import { TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// images / Styles
import { Fade } from 'react-awesome-reveal';
import Logo from '../../../assets/logos/IBLogo.png';

type FormValues = {
  stytchId: string;
  firstName: string;
  lastName: string;
  interestIds: number[];
};

export default function RegisterForm() {
  const [submitting, setSubmitting] = useState(false);
  const stytchClient = useStytch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  async function processSubmit(data: FormValues) {}

  return (
    <Fade>
      <div className='rootContainer'>
        <form className='form' onSubmit={handleSubmit(processSubmit)}>
          <div className='registerContainer'>
            <img></img>

          </div>
        </form>
      </div>
    </Fade>
  )
};
