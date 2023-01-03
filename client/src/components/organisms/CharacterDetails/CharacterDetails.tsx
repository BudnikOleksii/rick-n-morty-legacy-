import React, { FC, useEffect } from 'react';
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
import { CardButtonsWrapper } from '../../atoms/CardButtonsWrapper';
import { ListItemComponent } from '../../molecules/ListItemComponent';
import { SetsModalList } from '../SetsModalList';
import { selectAuth } from '../../../features/auth/auth-selectors';
import { selectSets } from '../../../features/sets/sets-selcetors';
import { selectCharacters } from '../../../features/characters/characters-selectors';
import { registerAction } from '../../../features/actions-info/actions-info-slice';
import { setsLoadingStart, toggleCharacterInSetStart } from '../../../features/sets/sets-slice';
import { NAME_SPACES } from '../../../constants';
import { ISet } from '../../../types/set';
import { EpisodesModal } from '../EpisodesModal';
import { CharacterSetsModal } from '../CharacterSetsModal';
import { CreateCardModal } from '../CreateCardModal';

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
          <EpisodesModal episodes={episodes} />

          {sets && sets.length > 0 && (
            <CharacterSetsModal sets={sets} onToggleCharacterInSet={handleToggleCharacterInSet} />
          )}

          {isAdmin && setsWhereCanAdd.length > 0 && (
            <SetsModalList
              sets={setsWhereCanAdd}
              onToggleCharacterInSet={handleToggleCharacterInSet}
            />
          )}

          {isAdmin && allCharactersUsed && <CreateCardModal characterId={id} />}
        </CardButtonsWrapper>
      </CardContent>
    </Card>
  );
};
