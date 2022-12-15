import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { BaseModal } from '../../molecules/BaseModal';
import { useAppDispatch } from '../../../app/hooks';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { betForLot } from '../../../features/lots/lots-slice';
import { ILot } from '../../../types/lot';

interface Props {
  lot: ILot;
}

interface IBet {
  bet: number;
}

export const BetFormModal: FC<Props> = ({ lot }) => {
  const { id, current_price, min_step, max_price } = lot;
  const dispatch = useAppDispatch();
  const schema = yup.object().shape({
    bet: yup
      .number()
      .min(current_price + min_step)
      .max(max_price)
      .required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBet>({ resolver: yupResolver(schema) });
  const [openBetForm, setOpenBetForm] = useState(false);

  const onSubmit = handleSubmit((data) => {
    dispatch(
      betForLot({
        id,
        bet: data.bet,
      })
    );
    setOpenBetForm(false);
  });

  return (
    <BaseModal
      open={openBetForm}
      onOpenChange={setOpenBetForm}
      openModalTitle="Bet"
      buttonVariant="contained"
      buttonColor="secondary"
    >
      <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          error={Boolean(errors.bet)}
          {...register('bet')}
          margin="normal"
          required
          fullWidth
          id="bet"
          label="Set your bet"
          name="bet"
          helperText={errors.bet?.message}
        />

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Bet
        </Button>
      </Box>
    </BaseModal>
  );
};
