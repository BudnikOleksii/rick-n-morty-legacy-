import React, { FC } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useAppDispatch } from '../../../app/hooks';
import { getLocalTime } from '../../../helpers/date-helpers';
import { createNewLot } from '../../../features/lots/lots-slice';
import { DEFAULT_MAX_PRICE } from '../../../constants';
import { INewLot } from '../../../types/lot';

interface Props {
  cardId: number;
}

const schema = yup.object().shape({
  initialPrice: yup.number().min(1),
  endDate: yup.date().min(new Date()),
  minAuctionDuration: yup.number().min(100),
  minStep: yup.number().min(10),
  maxPrice: yup
    .number()
    .min(0)
    .nullable(true)
    .transform((_, val) => (val === Number(val) ? val : null)),
});

export const NewAuctionForm: FC<Props> = ({ cardId }) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewLot>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit((data) => {
    dispatch(
      createNewLot({
        ...data,
        cardId,
        endDate: getLocalTime(data.endDate || ''),
        maxPrice: data.maxPrice || DEFAULT_MAX_PRICE,
      })
    );
  });

  const defaultData = new Date().toISOString().split(':');

  return (
    <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        error={Boolean(errors.initialPrice)}
        {...register('initialPrice')}
        margin="normal"
        fullWidth
        id="initialPrice"
        label="Initial price"
        name="initialPrice"
        type="number"
        helperText={errors.initialPrice?.message}
      />

      <TextField
        error={Boolean(errors.endDate)}
        {...register('endDate')}
        id="datetime-local"
        label="End date"
        type="datetime-local"
        defaultValue={defaultData[0] + ':' + defaultData[1]}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        helperText={errors.endDate?.message}
      />

      <TextField
        error={Boolean(errors.minAuctionDuration)}
        {...register('minAuctionDuration')}
        margin="normal"
        fullWidth
        id="minAuctionDuration"
        label="Min auction duration"
        name="minAuctionDuration"
        type="number"
        helperText={errors.minAuctionDuration?.message}
      />

      <TextField
        error={Boolean(errors.minStep)}
        {...register('minStep')}
        margin="normal"
        fullWidth
        id="minStep"
        label="Min step"
        name="minStep"
        type="number"
        helperText={errors.minStep?.message}
      />

      <TextField
        error={Boolean(errors.maxPrice)}
        {...register('maxPrice')}
        margin="normal"
        fullWidth
        id="maxPrice"
        label="Max price"
        name="maxPrice"
        type="number"
        helperText={errors.maxPrice?.message}
      />

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Start auction
      </Button>
    </Box>
  );
};
