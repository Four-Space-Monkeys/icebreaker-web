/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useStytchSession, useStytch } from '@stytch/react';
// images / Styles
import { Fade } from 'react-awesome-reveal';
// import Logo from '../../../assets/logos/IBLogo.png';

type FormValues = {
  stytchId: string;
  firstName: string;
  lastName: string;
  interestIds: number;
};

export default function RegisterForm() {
  const { session } = useStytchSession();
  const client = useStytch();
  const [interestOptions, setInterestOptions] = useState([]);
  if (!session) {
    throw new Error('stytch id not found');
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      stytchId: session.user_id,
    },
  });

  useEffect(() => {
    axios
      .get('http://localhost:8080/interests')
      .then(({ data }) => setInterestOptions(data))
      .catch(() => {
        throw new Error('error fetching interest list');
      });
  }, [session?.user_id]);

  async function processSubmit(data: FormValues) {
    console.log('here is the data', data);
    try {
      axios.post('http://localhost:8080/users', {
        data,
      });
      alert('You are now registered');
    } catch (err: any) {
      console.log('There was an error', err);
    }
  }

  const handleLogout = useCallback(async () => {
    await client.session.revoke();
    alert('Logged Out!');
  }, [client]);

  return (
    <Fade direction="down">
      <div className="rootContainer">
        <form className="form" onSubmit={handleSubmit(processSubmit)}>
          <div className="registerContainer">
            <p className="header">
              Fill out your Profile and choose atleast one interests
            </p>
            <input
              className="inputBox"
              placeholder="First Name"
              {...register('firstName', {
                required: true,
              })}
            />
            <input
              className="inputBox"
              placeholder="Last Name"
              {...register('lastName', {
                required: true,
              })}
            />
            {interestOptions.map((interest: { id: number; name: 'string' }) => (
              <label htmlFor="domId" key={interest.id}>
                {interest.name}
                <input
                  {...register('interestIds', {
                    required: 'Please choose atleast one interest',
                    valueAsNumber: true,
                    setValueAs: (value) => parseInt(value, 10),
                  })}
                  type="checkbox"
                  value={interest.id}
                />
              </label>
            ))}
            <ErrorMessage
              errors={errors}
              name="interestIds"
              render={({ message }) => <p>{message}</p>}
            />
            <input type="submit" style={{ display: 'none' }} />
            <button
              type="button"
              className="button"
              onClick={handleSubmit(processSubmit)}
            >
              Save
            </button>
          </div>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </form>
      </div>
    </Fade>
  );
}
