import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import { CardItem } from '../CardItem';
import { ICard } from '../../../types/card';

type Props = {
  cards: ICard[];
};

export const CardsList: FC<Props> = ({ cards }) => {
  return (
    <Grid container spacing={2}>
      {cards.map((card) => (
        <CardItem card={card} key={card.id} />
      ))}
    </Grid>
  );
};
