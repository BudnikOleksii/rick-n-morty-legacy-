import React, { FC, useState } from 'react';
import { ISet } from '../../../types/set';
import { useTranslation } from 'react-i18next';
import { NAME_SPACES } from '../../../constants';
import { ListItemBase } from '../../atoms/ListItemBase';
import Button from '@mui/material/Button';
import { BaseModal } from '../../molecules/BaseModal';
import { useAppSelector } from '../../../app/hooks';
import { selectAuth } from '../../../features/auth/auth-selectors';

interface Props {
  sets: ISet[];
  onToggleCharacterInSet: (setId: number) => void;
}

export const CharacterSetsModal: FC<Props> = ({ sets, onToggleCharacterInSet }) => {
  const { t } = useTranslation();
  const { isAdmin } = useAppSelector(selectAuth);
  const [openSetsModal, setOpenSetsModal] = useState(false);

  const handleRemoveFromSet = (id: number) => {
    setOpenSetsModal(false);
    onToggleCharacterInSet(id);
  };

  return (
    <BaseModal
      open={openSetsModal}
      onOpenChange={setOpenSetsModal}
      openModalTitle={t('character.sets_info', { ns: NAME_SPACES.cards })}
      buttonVariant="contained"
      buttonColor="info"
    >
      {sets.map((set) => (
        <ListItemBase key={set.id} text={set.name}>
          {isAdmin && (
            <Button variant="outlined" color="warning" onClick={() => handleRemoveFromSet(set.id)}>
              {t('buttons.remove', { ns: NAME_SPACES.main })}
            </Button>
          )}
        </ListItemBase>
      ))}
    </BaseModal>
  );
};
