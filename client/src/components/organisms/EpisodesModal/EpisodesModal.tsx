import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IEpisode } from '../../../types/episode';
import { NAME_SPACES } from '../../../constants';
import { EpisodesList } from '../EpisodesList';
import { BaseModal } from '../../molecules/BaseModal';

interface Props {
  episodes: IEpisode[];
}

export const EpisodesModal: FC<Props> = ({ episodes }) => {
  const { t } = useTranslation();
  const [openEpisodesModal, setOpenEpisodesModal] = useState(false);

  return (
    <BaseModal
      open={openEpisodesModal}
      onOpenChange={setOpenEpisodesModal}
      openModalTitle={t('character.episodes', { ns: NAME_SPACES.cards })}
      buttonVariant="contained"
      buttonColor="info"
    >
      <EpisodesList episodes={episodes} />
    </BaseModal>
  );
};
