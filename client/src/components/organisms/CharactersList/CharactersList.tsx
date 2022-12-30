import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import { CharacterCard } from '../CharacterCard';
import { GridItem } from '../../atoms/GridItem';
import { ICharacterBaseInfo } from '../../../types/character';

interface Props {
  characters: ICharacterBaseInfo[];
}

export const CharactersList: FC<Props> = ({ characters }) => {
  return (
    <Grid container spacing={2}>
      {characters.map((character) => (
        <GridItem key={character.id}>
          <CharacterCard character={character} />
        </GridItem>
      ))}
    </Grid>
  );
};
