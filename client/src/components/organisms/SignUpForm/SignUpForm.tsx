import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../app/hooks';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { IRegistration } from '../../../types/auth';
import { registrationStart } from '../../../features/auth/auth-slice';
import { registerAction } from '../../../features/actions-info/actions-info-slice';
import { NAME_SPACES } from '../../../constants';

const schema = yup.object().shape({
  username: yup.string().trim().min(4).max(15).required(),
  login: yup.string().email().required(),
  password: yup.string().trim().min(4).max(15).required(),
});

export const SignUpForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistration>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit((data) => {
    dispatch(registerAction(registrationStart.type));
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
            label={t('auth.username', { ns: NAME_SPACES.main })}
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
            label={t('auth.email', { ns: NAME_SPACES.main })}
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
            label={t('auth.password', { ns: NAME_SPACES.main })}
            type="password"
            id="password"
            autoComplete="new-password"
            helperText={errors.password?.message}
          />
        </Grid>
      </Grid>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {t('auth.sign_up', { ns: NAME_SPACES.main })}
      </Button>
    </Box>
  );
};
