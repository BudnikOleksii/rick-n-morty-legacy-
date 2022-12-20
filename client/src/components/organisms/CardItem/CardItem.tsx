import React, { FC, useState } from 'react';
import Paper from '@mui/material/Paper';
import { BaseModal } from '../../molecules/BaseModal';
import { NewAuctionForm } from '../NewAuctionForm';
import { CharacterCard } from '../CharacterCard';
import { GridItem } from '../../atoms/GridItem';
import { useAppSelector } from '../../../app/hooks';
import { selectAuth } from '../../../features/auth/auth-selectors';
import { ICard } from '../../../types/card';
import { indigo } from '@mui/material/colors';

interface Props {
  card: ICard;
}

export const CardItem: FC<Props> = ({ card }) => {
  const { user, isAdmin } = useAppSelector(selectAuth);
  const [openAuctionModal, setOpenAuctionModal] = useState(false);

  const isUsersCard = user?.id === card.owner?.id;
  const isAdminCanStart = isAdmin && card.owner === null;
  const isHavePermision = isUsersCard || isAdminCanStart;

  return (
    <GridItem>
      <Paper
        elevation={12}
        sx={{ padding: '10px', backgroundColor: isUsersCard ? indigo[300] : 'white' }}
      >
        {isHavePermision && (
          <BaseModal
            open={openAuctionModal}
            onOpenChange={setOpenAuctionModal}
            openModalTitle="Start auction"
            buttonVariant="contained"
            buttonColor="secondary"
          >
            <NewAuctionForm cardId={card.id} />
          </BaseModal>
        )}

        <CharacterCard character={card.character} />
      </Paper>
    </GridItem>
  );
};
