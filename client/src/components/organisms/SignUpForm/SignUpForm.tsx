import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useAppDispatch } from '../../../app/hooks';
import { IRegistration } from '../../../types/auth';
import { registrationStart } from '../../../features/auth/auth-slice';

const schema = yup.object().shape({
  username: yup.string().trim().min(4).max(15).required(),
  login: yup.string().email().required(),
  password: yup.string().trim().min(4).max(15).required(),
});

export const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistration>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit((data) => {
    dispatch(registrationStart(data));
  });

  return (
    <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            error={Boolean(errors.username)}
            {...register('username')}
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            helperText={errors.username?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            error={Boolean(errors.login)}
            {...register('login')}
            required
            fullWidth
            id="login"
            label="Email Address"
            name="login"
            autoComplete="email"
            helperText={errors.login?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            error={Boolean(errors.password)}
            {...register('password')}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            helperText={errors.password?.message}
          />
        </Grid>
      </Grid>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
    </Box>
  );
};
