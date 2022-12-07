import React, { FC } from 'react';
import { ICharacter } from '../../types/character';
import Grid from '@mui/material/Grid';
import { CharacterCard } from '../CharacterCard';

interface Props {
  characters: ICharacter[];
}

export const CharactersList: FC<Props> = ({ characters }) => {
  return (
    <Grid container spacing={2}>
      {characters.map((character) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          display="flex"
          justifyContent="center"
          key={character.id}
        >
          <CharacterCard character={character} />
        </Grid>
      ))}
    </Grid>
  );
};
