import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../constants';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { registrationStart } from '../features/auth/auth-slice';
import { IRegistration } from '../types/auth';
import { selectAuth } from '../features/auth/auth-selectors';

const schema = yup.object().shape({
  username: yup.string().min(4).max(15).required(),
  login: yup.string().email().required(),
  password: yup.string().min(4).max(15).required(),
});

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistration>({ resolver: yupResolver(schema) });

  const { isLoggedIn } = useAppSelector(selectAuth);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  const onSubmit = handleSubmit((data) => {
    dispatch(registrationStart(data));
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
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
          <Grid container justifyContent="flex-end">
            <Grid item xs={6}>
              <Link variant="body2" onClick={() => navigate('/')}>
                {'Logged in? Home page'}
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link variant="body2" onClick={() => navigate(PATHS.login)}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Registration;
