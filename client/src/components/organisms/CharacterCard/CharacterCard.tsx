import { FC } from 'react';
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
import { BaseModal } from '../../molecules/BaseModal';
import { ICharacter } from '../../../types/character';
import { EpisodesList } from '../EpisodesList';
import { ListItemComponent } from '../../molecules/ListItemComponent';
import Button from '@mui/material/Button';
import { ListItemBase } from '../../atoms/ListItemBase';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAuth } from '../../../features/auth/auth-selectors';
import { SetsList } from '../SetsList';
import { toggleCharacterInSetStart } from '../../../features/sets/sets-slice';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../../constants';
import { CardActions } from '@mui/material';

type Props = {
  character: ICharacter;
};
export const CharacterCard: FC<Props> = ({ character }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAdmin } = useAppSelector(selectAuth);
  const { name, image, status, gender, type, species, origin, location, episodes, sets } =
    character;

  const handleToggleCharacterInSet = (setId: number) => {
    dispatch(
      toggleCharacterInSetStart({
        setId,
        characterId: character.id,
      })
    );
    navigate(PATHS.sets);
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

      <BaseModal openModalTitle="Episodes info">
        <EpisodesList episodes={episodes} />
      </BaseModal>

      <CardActions>
        {sets && sets.length > 0 && (
          <BaseModal openModalTitle="Sets info" buttonVariant="contained" buttonColor="info">
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

        {isAdmin && (
          <BaseModal openModalTitle="Add to set" buttonVariant="contained" buttonColor="success">
            <SetsList onToggleCharacterInSet={handleToggleCharacterInSet} />
          </BaseModal>
        )}
      </CardActions>
    </Card>
  );
};
