import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import EventIcon from '@mui/icons-material/Event';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ListItemComponent } from '../../molecules/ListItemComponent';
import { getLocalDate, getLocalTime } from '../../../helpers/date-helpers';
import { CardActions } from '@mui/material';
import { BaseModal } from '../../molecules/BaseModal';
import { CharacterCard } from '../CharacterCard';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAuth } from '../../../features/auth/auth-selectors';
import { betForLot } from '../../../features/lots/lots-slice';
import { ILot } from '../../../types/lot';
import { red } from '@mui/material/colors';

const adminsLotColor = red[500];

interface Props {
  lot: ILot;
}

interface IBet {
  bet: number;
}

export const LotCard: FC<Props> = ({ lot }) => {
  const {
    id,
    initial_price,
    current_price,
    max_price,
    start_date,
    end_date,
    card,
    lastPersonToBet,
    min_step,
  } = lot;

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
  const { user } = useAppSelector(selectAuth);

  const canBet = user?.id !== lastPersonToBet?.id && user?.id !== card.owner?.id;
  const isAdminsLot = card.owner === null;

  const onSubmit = handleSubmit((data) => {
    dispatch(
      betForLot({
        id,
        bet: data.bet,
      })
    );
  });

  return (
    <Card
      sx={{
        maxWidth: '100%',
        border: '2px solid transparent',
        borderColor: isAdminsLot ? adminsLotColor : 'transparent',
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {card.character.name}
        </Typography>

        <List>
          <ListItemComponent
            name="Initial price"
            value={initial_price}
            icon={<AttachMoneyIcon />}
          />
          <ListItemComponent
            name="Current price"
            value={current_price}
            icon={<AttachMoneyIcon />}
          />
          <ListItemComponent name="Max price" value={max_price} icon={<CurrencyExchangeIcon />} />
          <ListItemComponent
            name="Start date"
            value={getLocalDate(start_date)}
            icon={<EventIcon />}
          />
          <ListItemComponent
            name="End date"
            value={getLocalTime(end_date)}
            icon={<EventBusyIcon />}
          />
        </List>

        <CardActions>
          <BaseModal openModalTitle="Card info" buttonVariant="contained" buttonColor="info">
            <CharacterCard character={card.character} />
          </BaseModal>

          {canBet && (
            <BaseModal openModalTitle="Bet" buttonVariant="contained" buttonColor="secondary">
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
                  Create set
                </Button>
              </Box>
            </BaseModal>
          )}
        </CardActions>
      </CardContent>
    </Card>
  );
};
