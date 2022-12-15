import React, { FC, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import EventIcon from '@mui/icons-material/Event';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { ListItemComponent } from '../../molecules/ListItemComponent';
import { getLocalDate, getLocalTime } from '../../../helpers/date-helpers';
import { CardActions } from '@mui/material';
import { BaseModal } from '../../molecules/BaseModal';
import { CharacterCard } from '../CharacterCard';
import { useAppSelector } from '../../../app/hooks';
import { selectAuth } from '../../../features/auth/auth-selectors';
import { ILot } from '../../../types/lot';
import { red } from '@mui/material/colors';
import { BetFormModal } from '../BetFormModal';

const adminsLotColor = red[500];

interface Props {
  lot: ILot;
}

export const LotCard: FC<Props> = ({ lot }) => {
  const { initial_price, current_price, max_price, start_date, end_date, card, lastPersonToBet } =
    lot;
  const { user } = useAppSelector(selectAuth);
  const [openCharInfoModal, setOpenCharInfoModal] = useState(false);

  const canBet = user?.id !== lastPersonToBet?.id && user?.id !== card.owner?.id;
  const isAdminsLot = card.owner === null;

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
          <BaseModal
            open={openCharInfoModal}
            onOpenChange={setOpenCharInfoModal}
            openModalTitle="Card info"
            buttonVariant="contained"
            buttonColor="info"
          >
            <CharacterCard character={card.character} />
          </BaseModal>

          {canBet && <BetFormModal lot={lot} />}
        </CardActions>
      </CardContent>
    </Card>
  );
};
