import React, { FC } from 'react';
import { ISet } from '../../../types/set';
import { CharactersList } from '../CharactersList';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAuth } from '../../../features/auth/auth-selectors';
import { BaseModal } from '../../molecules/BaseModal';
import { deleteSetStart } from '../../../features/sets/sets-slice';

interface Props {
  set: ISet;
}

export const SetBlock: FC<Props> = ({ set }) => {
  const { id, name, characters } = set;
  const dispatch = useAppDispatch();
  const { isAdmin } = useAppSelector(selectAuth);

  const handleSetDelete = () => {
    dispatch(
      deleteSetStart({
        id,
      })
    );
  };

  return (
    <Paper elevation={12} sx={{ padding: '20px', margin: '20px 0' }}>
      <Typography component="h2" variant="h4" align="center" color="text.primary" gutterBottom>
        {name}
      </Typography>

      <Divider sx={{ margin: '20px' }} />

      {characters && characters?.length > 0 && (
        <CharactersList key={set.id} characters={characters} />
      )}

      <Divider sx={{ margin: '20px' }}>{set.name} end</Divider>

      {isAdmin && (
        <BaseModal openModalTitle="Delete set" buttonVariant="contained" buttonColor="error">
          Are you sure you want delete current set?
          <Button
            variant="contained"
            sx={{ display: 'block', margin: '15px auto' }}
            color="error"
            onClick={handleSetDelete}
          >
            Confirm
          </Button>
        </BaseModal>
      )}
    </Paper>
  );
};
