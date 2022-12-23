import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useAppDispatch } from '../../../app/hooks';
import { loginStart } from '../../../features/auth/auth-slice';
import { registerAction } from '../../../features/actions-info/actions-info-slice';
import { ILogin } from '../../../types/auth';

const schema = yup.object().shape({
  login: yup.string().email().required(),
  password: yup.string().trim().min(4).max(15).required(),
});

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit((data) => {
    dispatch(registerAction(loginStart.type));
    dispatch(loginStart(data));
  });

  return (
    <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        error={Boolean(errors.login)}
        {...register('login')}
        margin="normal"
        required
        fullWidth
        id="login"
        label="Email Address"
        name="login"
        autoComplete="email"
        autoFocus
        helperText={errors.login?.message}
      />

      <TextField
        error={Boolean(errors.password)}
        {...register('password')}
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        helperText={errors.password?.message}
      />

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
    </Box>
  );
};