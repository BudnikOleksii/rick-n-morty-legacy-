import React, { FC, useState } from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { CharactersList } from '../CharactersList';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAuth } from '../../../features/auth/auth-selectors';
import { deleteSetStart } from '../../../features/sets/sets-slice';
import { registerAction } from '../../../features/actions-info/actions-info-slice';
import { ISetWithCharacters } from '../../../types/set';
import { BaseModal } from '../../molecules/BaseModal';
import { ConfirmButton } from '../../atoms/ConfirmButton';

interface Props {
  set: ISetWithCharacters;
}

export const SetBlock: FC<Props> = ({ set }) => {
  const { id, name, characters } = set;
  const dispatch = useAppDispatch();
  const { isAdmin } = useAppSelector(selectAuth);
  const [openDeleteSetConfirm, setOpenDeleteSetConfirm] = useState(false);

  const handleSetDelete = () => {
    dispatch(registerAction(deleteSetStart.type));
    dispatch(
      deleteSetStart({
        id,
      })
    );

    setOpenDeleteSetConfirm(false);
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
        <BaseModal
          openModalTitle="Delete set"
          buttonColor="error"
          buttonVariant="contained"
          open={openDeleteSetConfirm}
          onOpenChange={setOpenDeleteSetConfirm}
        >
          Are you sure you want delete current set?
          <ConfirmButton onConfirm={handleSetDelete} />
        </BaseModal>
      )}
    </Paper>
  );
};
