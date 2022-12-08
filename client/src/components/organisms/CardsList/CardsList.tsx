import React, { FC } from 'react';
import { ICard } from '../../../types/card';
import Grid from '@mui/material/Grid';
import { CharacterCard } from '../CharacterCard';
import { GridItem } from '../../atoms/GridItem';

type Props = {
  cards: ICard[];
};

export const CardsList: FC<Props> = ({ cards }) => {
  return (
    <Grid container spacing={2}>
      {cards.map((card) => (
        <GridItem key={card.id}>
          <CharacterCard character={card.character} />
        </GridItem>
      ))}
    </Grid>
  );
};
