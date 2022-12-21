import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { BaseModal } from '../../molecules/BaseModal';
import { useAppDispatch } from '../../../app/hooks';
import { registerAction } from '../../../features/actions-info/actions-info-slice';
import { createChatStart } from '../../../features/chats/chats-slice';

const schema = yup.object().shape({
  name: yup.string().trim().min(4).max(25).required(),
});

export interface INewChat {
  name: string;
}

export const ChatFormModal = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewChat>({ resolver: yupResolver(schema) });
  const [openNewChatForm, setOpenNewChatForm] = useState(false);

  const onSubmit = handleSubmit((data) => {
    dispatch(registerAction(createChatStart.type));
    dispatch(createChatStart(data));

    setOpenNewChatForm(false);
  });

  return (
    <BaseModal
      open={openNewChatForm}
      onOpenChange={setOpenNewChatForm}
      openModalTitle="Create chat"
      buttonVariant="contained"
    >
      <Typography component="h1" variant="h5" textAlign="center">
        Create new chat
      </Typography>

      <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          error={Boolean(errors.name)}
          {...register('name')}
          margin="normal"
          required
          fullWidth
          id="name"
          label="Chat name"
          name="name"
          autoFocus
          helperText={errors.name?.message}
        />

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Create chat
        </Button>
      </Box>
    </BaseModal>
  );
};
