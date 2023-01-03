import React, { FC, useState } from 'react';
import { NAME_SPACES } from '../../../constants';
import { ConfirmButton } from '../../atoms/ConfirmButton';
import { BaseModal } from '../../molecules/BaseModal';
import { registerAction } from '../../../features/actions-info/actions-info-slice';
import { createCardStart } from '../../../features/cards/cards-slice';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../app/hooks';

interface Props {
  characterId: number;
}

export const CreateCardModal: FC<Props> = ({ characterId }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [openCreateCardModal, setOpenCreateCardModal] = useState(false);

  const handleCreateNewCard = () => {
    dispatch(registerAction(createCardStart.type));
    dispatch(createCardStart({ id: characterId }));

    setOpenCreateCardModal(false);
  };

  return (
    <BaseModal
      openModalTitle={t('character.create_card_btn', { ns: NAME_SPACES.cards })}
      buttonVariant="contained"
      buttonColor="secondary"
      open={openCreateCardModal}
      onOpenChange={setOpenCreateCardModal}
    >
      {t('character.create_card_msg', { ns: NAME_SPACES.cards })}
      <ConfirmButton onConfirm={handleCreateNewCard} />
    </BaseModal>
  );
};
