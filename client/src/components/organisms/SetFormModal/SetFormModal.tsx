import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../../../app/hooks';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BaseModal } from '../../molecules/BaseModal';
import { INewSet } from '../../../types/set';
import { createSetStart } from '../../../features/sets/sets-slice';
import { registerAction } from '../../../features/actions-info/actions-info-slice';

const schema = yup.object().shape({
  name: yup.string().trim().min(4).max(15).required(),
});

export const SetFormModal = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewSet>({ resolver: yupResolver(schema) });
  const [openNewSetForm, setOpenNewSetForm] = useState(false);

  const onSubmit = handleSubmit((data) => {
    dispatch(registerAction(createSetStart.type));
    dispatch(createSetStart(data));

    setOpenNewSetForm(false);
  });

  return (
    <BaseModal
      open={openNewSetForm}
      onOpenChange={setOpenNewSetForm}
      openModalTitle="Create Set"
      buttonVariant="contained"
    >
      <Typography component="h1" variant="h5" textAlign="center">
        Create new set
      </Typography>

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
    </BaseModal>
  );
};
