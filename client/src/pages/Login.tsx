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
import { loginStart } from '../features/auth/auth-slice';
import { selectAuth } from '../features/auth/auth-selectors';
import { ILogin } from '../types/auth';

const schema = yup.object().shape({
  login: yup.string().email().required(),
  password: yup.string().min(4).max(15).required(),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({ resolver: yupResolver(schema) });

  const { isLoggedIn } = useAppSelector(selectAuth);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  const onSubmit = handleSubmit((data) => {
    dispatch(loginStart(data));
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
          Sign in
        </Typography>
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
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link variant="body2" onClick={() => navigate(PATHS.registration)}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
