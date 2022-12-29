import React, { FC, useState } from 'react';
import { ISet } from '../../../types/set';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { BaseModal } from '../../molecules/BaseModal';
import { ConfirmButton } from '../../atoms/ConfirmButton';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAuth } from '../../../features/auth/auth-selectors';
import { registerAction } from '../../../features/actions-info/actions-info-slice';
import { deleteSetStart } from '../../../features/sets/sets-slice';
import { useNavigate } from 'react-router-dom';
import { CharactersInSetModal } from '../CharactersInSetModal';

interface Props {
  set: ISet;
}

export const SetListItem: FC<Props> = ({ set }) => {
  const { id, name, characters } = set;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAdmin } = useAppSelector(selectAuth);
  const [openDeleteSetConfirm, setOpenDeleteSetConfirm] = useState(false);
  const [openCharactersInChatModal, setOpenCharactersInChatModal] = useState(false);

  const handleSetDelete = () => {
    dispatch(registerAction(deleteSetStart.type));
    dispatch(deleteSetStart({ id }));

    setOpenDeleteSetConfirm(false);
  };

  const handleOpenSet = () => {
    navigate(String(id));
  };

  return (
    <ListItem>
      <ListItemButton onClick={() => setOpenCharactersInChatModal(true)}>
        <ListItemText primary={name} />
      </ListItemButton>

      <Button onClick={handleOpenSet}>Open</Button>

      {isAdmin && (
        <BaseModal
          openModalTitle="Delete"
          buttonColor="error"
          buttonVariant="contained"
          open={openDeleteSetConfirm}
          onOpenChange={setOpenDeleteSetConfirm}
          styles={{ minWidth: 'max-content' }}
        >
          Are you sure you want delete current set?
          <ConfirmButton onConfirm={handleSetDelete} />
        </BaseModal>
      )}

      {characters && (
        <CharactersInSetModal
          isOpen={openCharactersInChatModal}
          onOpen={setOpenCharactersInChatModal}
          characters={characters}
        />
      )}
    </ListItem>
  );
};
