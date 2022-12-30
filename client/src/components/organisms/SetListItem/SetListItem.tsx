import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ISet } from '../../../types/set';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { BaseModal } from '../../molecules/BaseModal';
import { ConfirmButton } from '../../atoms/ConfirmButton';
import { selectAuth } from '../../../features/auth/auth-selectors';
import { registerAction } from '../../../features/actions-info/actions-info-slice';
import { deleteSetStart } from '../../../features/sets/sets-slice';
import { CharactersInSetModal } from '../CharactersInSetModal';
import { NAME_SPACES } from '../../../constants';
import Typography from '@mui/material/Typography';

interface Props {
  set: ISet;
}

export const SetListItem: FC<Props> = ({ set }) => {
  const { id, name, characters } = set;
  const { t } = useTranslation();
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

      <Button onClick={handleOpenSet}>{t('buttons.open', { ns: NAME_SPACES.main })}</Button>

      {isAdmin && (
        <BaseModal
          openModalTitle={t('buttons.delete', { ns: NAME_SPACES.main })}
          buttonColor="error"
          buttonVariant="contained"
          open={openDeleteSetConfirm}
          onOpenChange={setOpenDeleteSetConfirm}
          styles={{ minWidth: 'max-content' }}
        >
          <Typography textAlign="center">
            {t('sets.delete_message', { ns: NAME_SPACES.pages })}
          </Typography>
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
