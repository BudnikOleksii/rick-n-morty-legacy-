import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { registerAction } from '../../../features/actions-info/actions-info-slice';
import { selectMessages } from '../../../features/messages/messages-selectors';
import { createMessageStart } from '../../../features/messages/messages-slice';
import { INewMessage } from '../../../types/chat-messages';
import { NAME_SPACES } from '../../../constants';

const schema = yup.object().shape({
  body: yup.string().trim().min(1).required(),
});

export const NewMessageForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { chat } = useAppSelector(selectMessages);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<INewMessage>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit((data) => {
    if (chat) {
      dispatch(registerAction(createMessageStart.type));
      dispatch(
        createMessageStart({
          ...data,
          chatId: chat.id,
        })
      );

      reset();
    }
  });

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      noValidate
      sx={{ mt: 1, display: 'flex', padding: '10px' }}
    >
      <TextField
        error={Boolean(errors.body)}
        {...register('body')}
        id="new-message"
        variant="standard"
        label={t('chat.new_message', { ns: NAME_SPACES.pages })}
        fullWidth
        helperText={errors.body?.message}
      />

      <Fab type="submit" color="primary" size="small" aria-label="new-message">
        <SendIcon />
      </Fab>
    </Box>
  );
};
