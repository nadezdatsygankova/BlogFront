import React from 'react';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import styles from './Login.module.scss';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: 'Marty Y',
      email: 'martyY@gmail.com',
      password: 'hdhhvkkddvf',
    },
    mode: 'onChange',
  });
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert('Failed registration!');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Create an account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit ={handleSubmit(onSubmit)}>
      <TextField
        error={Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message}
        {...register('fullName', { required: 'Enter a valid full name' })}
        className={styles.field}
        label="Full Name"
        fullWidth
      />
      <TextField
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register('email', { required: 'Enter a valid email' })}
        className={styles.field}
        label="E-Mail"
        fullWidth
      />
      <TextField
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        {...register('password', { required: 'Enter a valid password' })}
        className={styles.field}
        label="Password"
        fullWidth
      />
      <Button disabled={!isValid} type= 'submit' size="large" variant="contained" fullWidth>
        Create an account
      </Button>
      </form>
    </Paper>
  );
};
