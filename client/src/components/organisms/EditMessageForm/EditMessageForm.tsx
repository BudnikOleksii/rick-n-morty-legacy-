import React, { FC } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import * as yup from 'yup';
import { useAppDispatch } from '../../../app/hooks';
import { useForm } from 'react-hook-form';
import { IMessage, INewMessage } from '../../../types/chat-messages';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { registerAction } from '../../../features/actions-info/actions-info-slice';
import { editMessageStart } from '../../../features/messages/messages-slice';

interface Props {
  message: IMessage;
  onFormClose: () => void;
}

const schema = yup.object().shape({
  body: yup.string().trim().min(1).required(),
});

export const EditMessageForm: FC<Props> = ({ message, onFormClose }) => {
  const { id, chat_id, body } = message;
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<INewMessage>({ resolver: yupResolver(schema) });

  const onEditMessageSubmit = handleSubmit((data) => {
    if (data.body === body) {
      onFormClose();
      return;
    }

    dispatch(registerAction(editMessageStart.type));
    dispatch(
      editMessageStart({
        ...data,
        chatId: chat_id,
        messageId: id,
      })
    );

    onFormClose();
  });

  return (
    <Box
      component="form"
      onSubmit={onEditMessageSubmit}
      noValidate
      sx={{ mt: 1, display: 'flex', padding: '10px' }}
    >
      <TextField
        error={Boolean(errors.body)}
        {...register('body')}
        id="edited-message"
        defaultValue={body}
        variant="standard"
        label="Edit message"
        fullWidth
        helperText={errors.body?.message}
      />

      <IconButton type="submit" color="success" aria-label="submit edited message">
        <EditIcon />
      </IconButton>
    </Box>
  );
};
