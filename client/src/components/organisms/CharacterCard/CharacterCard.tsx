import React, { FC, useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import TransgenderIcon from '@mui/icons-material/Transgender';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import PublicIcon from '@mui/icons-material/Public';
import LanguageIcon from '@mui/icons-material/Language';
import Button from '@mui/material/Button';
import { BaseModal } from '../../molecules/BaseModal';
import { EpisodesList } from '../EpisodesList';
import { SetsList } from '../SetsList';
import { ListItemComponent } from '../../molecules/ListItemComponent';
import { ListItemBase } from '../../atoms/ListItemBase';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAuth } from '../../../features/auth/auth-selectors';
import { toggleCharacterInSetStart } from '../../../features/sets/sets-slice';
import { selectSets } from '../../../features/sets/sets-selcetors';
import { registerAction } from '../../../features/actions-info/actions-info-slice';
import { selectCharacters } from '../../../features/characters/characters-selectors';
import { createCardStart } from '../../../features/cards/cards-slice';
import { ICharacter } from '../../../types/character';
import { ConfirmButton } from '../../atoms/ConfirmButton';

type Props = {
  character: ICharacter;
};
export const CharacterCard: FC<Props> = ({ character }) => {
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
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia component="img" height="300" image={image} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>

        <List>
          <ListItemComponent name="Status" value={status} icon={<MonitorHeartIcon />} />
          <ListItemComponent name="Gender" value={gender} icon={<TransgenderIcon />} />
          <ListItemComponent name="Type" value={type} icon={<Diversity3Icon />} />
          <ListItemComponent name="Species" value={species} icon={<Diversity2Icon />} />
          <ListItemComponent name="Origin" value={origin?.name} icon={<PublicIcon />} />
          <ListItemComponent name="Location" value={location?.name} icon={<LanguageIcon />} />
        </List>
      </CardContent>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          padding: '8px',
        }}
      >
        <BaseModal
          open={openEpisodesModal}
          onOpenChange={setOpenEpisodesModal}
          openModalTitle="Episodes"
          buttonVariant="contained"
          buttonColor="info"
        >
          <EpisodesList episodes={episodes} />
        </BaseModal>

        {sets && sets.length > 0 && (
          <BaseModal
            open={openSetsModal}
            onOpenChange={setOpenSetsModal}
            openModalTitle="Sets info"
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
                    Remove
                  </Button>
                )}
              </ListItemBase>
            ))}
          </BaseModal>
        )}

        {isAdmin && allSets && allSets.length > 0 && (
          <BaseModal
            open={openAddSetModal}
            onOpenChange={setOpenAddSetModal}
            openModalTitle="Add to set"
            buttonVariant="contained"
            buttonColor="success"
          >
            <SetsList sets={allSets} onToggleCharacterInSet={handleToggleCharacterInSet} />
          </BaseModal>
        )}

        {isAdmin && allCharactersUsed && (
          <BaseModal
            openModalTitle="Create card"
            buttonVariant="contained"
            buttonColor="secondary"
            open={openCreateCardModal}
            onOpenChange={setOpenCreateCardModal}
          >
            Are you sure you want create new card with this character?
            <ConfirmButton onConfirm={handleCreateNewCard} />
          </BaseModal>
        )}
      </div>
    </Card>
  );
};
