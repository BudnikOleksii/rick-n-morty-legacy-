import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import { ListItemBase } from '../../atoms/ListItemBase';
import { BaseModal } from '../../molecules/BaseModal';
import { ISet } from '../../../types/set';
import { NAME_SPACES } from '../../../constants';

interface Props {
  sets: ISet[];
  onToggleCharacterInSet: (setId: number) => void;
}

export const SetsModalList: FC<Props> = ({ sets, onToggleCharacterInSet }) => {
  const { t } = useTranslation();
  const [openAddSetModal, setOpenAddSetModal] = useState(false);

  const handleAddToSet = (id: number) => {
    setOpenAddSetModal(false);
    onToggleCharacterInSet(id);
  };

  return (
    <BaseModal
      open={openAddSetModal}
      onOpenChange={setOpenAddSetModal}
      openModalTitle={t('character.add_to_set', { ns: NAME_SPACES.cards })}
      buttonVariant="contained"
      buttonColor="success"
    >
      <List>
        {sets.map((set) => (
          <ListItemBase key={set.id} text={set.name}>
            <Button variant="outlined" color="success" onClick={() => handleAddToSet(set.id)}>
              {t('buttons.add', { ns: NAME_SPACES.main })}
            </Button>
          </ListItemBase>
        ))}
      </List>
    </BaseModal>
  );
};
