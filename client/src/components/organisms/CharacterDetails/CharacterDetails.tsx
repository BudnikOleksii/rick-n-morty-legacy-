import React, { FC, useEffect, useState } from 'react';
import { ICharacter } from '../../../types/character';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import TransgenderIcon from '@mui/icons-material/Transgender';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import PublicIcon from '@mui/icons-material/Public';
import LanguageIcon from '@mui/icons-material/Language';
import Button from '@mui/material/Button';
import { CardButtonsWrapper } from '../../atoms/CardButtonsWrapper';
import { BaseModal } from '../../molecules/BaseModal';
import { EpisodesList } from '../EpisodesList';
import { ListItemBase } from '../../atoms/ListItemBase';
import { ListItemComponent } from '../../molecules/ListItemComponent';
import { SetsModalList } from '../SetsModalList';
import { ConfirmButton } from '../../atoms/ConfirmButton';
import { selectAuth } from '../../../features/auth/auth-selectors';
import { selectSets } from '../../../features/sets/sets-selcetors';
import { selectCharacters } from '../../../features/characters/characters-selectors';
import { registerAction } from '../../../features/actions-info/actions-info-slice';
import { setsLoadingStart, toggleCharacterInSetStart } from '../../../features/sets/sets-slice';
import { createCardStart } from '../../../features/cards/cards-slice';
import { NAME_SPACES } from '../../../constants';
import { ISet } from '../../../types/set';

interface Props {
  character: ICharacter;
}

export const CharacterDetails: FC<Props> = ({ character }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isAdmin } = useAppSelector(selectAuth);
  const { id, name, image, status, gender, type, species, origin, location, episodes, sets } =
    character;
  const { sets: allSets } = useAppSelector(selectSets);
  const { allCharactersUsed } = useAppSelector(selectCharacters);
  const [openEpisodesModal, setOpenEpisodesModal] = useState(false);
  const [openSetsModal, setOpenSetsModal] = useState(false);
  const [openAddSetModal, setOpenAddSetModal] = useState(false);
  const [openCreateCardModal, setOpenCreateCardModal] = useState(false);
  const charactersSetIds = new Set();
  const setsWhereCanAdd: ISet[] = [];

  if (sets && allSets) {
    sets.forEach((set) => {
      charactersSetIds.add(set.id);
    });

    allSets.forEach((set) => {
      if (!charactersSetIds.has(set.id)) {
        setsWhereCanAdd.push(set);
      }
    });
  }

  useEffect(() => {
    dispatch(registerAction(setsLoadingStart.type));
    dispatch(
      setsLoadingStart({
        params: `/all`,
      })
    );
  }, []);

  const handleToggleCharacterInSet = (setId: number) => {
    dispatch(registerAction(toggleCharacterInSetStart.type));
    dispatch(
      toggleCharacterInSetStart({
        setId,
        characterId: character.id,
      })
    );

    setOpenSetsModal(false);
    setOpenAddSetModal(false);
  };

  const handleCreateNewCard = () => {
    dispatch(registerAction(createCardStart.type));
    dispatch(createCardStart({ id }));

    setOpenCreateCardModal(false);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        maxWidth: 1000,
        margin: 'auto',
        alignItems: 'center',
        padding: '10px 0',
      }}
    >
      <CardMedia component="img" image={image} alt={name} sx={{ maxWidth: 300 }} />
      <CardContent>
        <List>
          <ListItemComponent
            name={t('character.status', { ns: NAME_SPACES.cards })}
            value={status}
            icon={<MonitorHeartIcon />}
          />
          <ListItemComponent
            name={t('character.gender', { ns: NAME_SPACES.cards })}
            value={gender}
            icon={<TransgenderIcon />}
          />
          <ListItemComponent
            name={t('character.type', { ns: NAME_SPACES.cards })}
            value={type}
            icon={<Diversity3Icon />}
          />
          <ListItemComponent
            name={t('character.species', { ns: NAME_SPACES.cards })}
            value={species}
            icon={<Diversity2Icon />}
          />
          <ListItemComponent
            name={t('character.origin', { ns: NAME_SPACES.cards })}
            value={origin?.name}
            icon={<PublicIcon />}
          />
          <ListItemComponent
            name={t('character.location', { ns: NAME_SPACES.cards })}
            value={location?.name}
            icon={<LanguageIcon />}
          />
        </List>

        <CardButtonsWrapper>
          <BaseModal
            open={openEpisodesModal}
            onOpenChange={setOpenEpisodesModal}
            openModalTitle={t('character.episodes', { ns: NAME_SPACES.cards })}
            buttonVariant="contained"
            buttonColor="info"
          >
            <EpisodesList episodes={episodes} />
          </BaseModal>

          {sets && sets.length > 0 && (
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
                    <Button
                      variant="outlined"
                      color="warning"
                      onClick={() => handleToggleCharacterInSet(set.id)}
                    >
                      {t('buttons.remove', { ns: NAME_SPACES.main })}
                    </Button>
                  )}
                </ListItemBase>
              ))}
            </BaseModal>
          )}

          {isAdmin && setsWhereCanAdd.length > 0 && (
            <BaseModal
              open={openAddSetModal}
              onOpenChange={setOpenAddSetModal}
              openModalTitle={t('character.add_to_set', { ns: NAME_SPACES.cards })}
              buttonVariant="contained"
              buttonColor="success"
            >
              <SetsModalList
                sets={setsWhereCanAdd}
                onToggleCharacterInSet={handleToggleCharacterInSet}
              />
            </BaseModal>
          )}

          {isAdmin && allCharactersUsed && (
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
          )}
        </CardButtonsWrapper>
      </CardContent>
    </Card>
  );
};
