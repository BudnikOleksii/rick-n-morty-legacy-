import React, { FC } from 'react';
import { ISet } from '../../types/set';
import { CharactersList } from '../CharactersList';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Paper } from '@mui/material';

interface Props {
  set: ISet;
}

export const SetBlock: FC<Props> = ({ set }) => {
  return (
    <Paper elevation={12} sx={{ padding: '20px', margin: '20px 0' }}>
      <Typography component="h2" variant="h4" align="center" color="text.primary" gutterBottom>
        {set.name}
      </Typography>

      <Divider sx={{ margin: '20px' }} />

      <CharactersList key={set.id} characters={set.characters} />

      <Divider sx={{ margin: '20px' }}>{set.name} end</Divider>
    </Paper>
  );
};
