import React, { FC } from 'react';
import { ICard } from '../../types/card';
import Grid from '@mui/material/Grid';
import { CharacterCard } from '../CharacterCard';

type Props = {
  cards: ICard[];
};

export const CardsList: FC<Props> = ({ cards }) => {
  return (
    <Grid container spacing={2}>
      {cards.map((card) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          display="flex"
          justifyContent="center"
          key={card.id}
        >
          <CharacterCard character={card.character} />
        </Grid>
      ))}
    </Grid>
  );
};
