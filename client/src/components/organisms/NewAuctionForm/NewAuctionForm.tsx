import React, { FC } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useAppDispatch } from '../../../app/hooks';
import { INewSet } from '../../../types/set';
import { createSetStart } from '../../../features/sets/sets-slice';

interface Props {
  cardId: number;
}

const schema = yup.object().shape({
  name: yup.string().trim().min(4).max(15).required(),
});

export const NewAuctionForm: FC<Props> = ({ cardId }) => {
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
        Start auction
      </Button>
    </Box>
  );
};
