import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../../../app/hooks';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import React from 'react';
import { INewSet } from '../../../types/set';
import { createSetStart } from '../../../features/sets/sets-slice';

const schema = yup.object().shape({
  name: yup.string().trim().min(4).max(15).required(),
});

export const SetForm = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewSet>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit((data) => {
    dispatch(createSetStart(data));
  });

  return (
    <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        error={Boolean(errors.name)}
        {...register('name')}
        margin="normal"
        required
        fullWidth
        id="name"
        label="Set name"
        name="name"
        autoFocus
        helperText={errors.name?.message}
      />

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Create set
      </Button>
    </Box>
  );
};
