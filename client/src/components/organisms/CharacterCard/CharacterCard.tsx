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

type Props = {
  character: ICharacter;
};
export const CharacterCard: FC<Props> = ({ character }) => {
  const { name, image, status, gender, type, species, origin, location, episodes } = character;

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

          {type && <ListItemComponent name="Type" value={type} icon={<Diversity3Icon />} />}
          {species && (
            <ListItemComponent name="Species" value={species} icon={<Diversity2Icon />} />
          )}
          {origin && <ListItemComponent name="Origin" value={origin.name} icon={<PublicIcon />} />}
          {location && (
            <ListItemComponent name="Location" value={location.name} icon={<LanguageIcon />} />
          )}
        </List>
      </CardContent>

      <BaseModal openModalTitle="Episodes info">
        <EpisodesList episodes={episodes} />
      </BaseModal>
    </Card>
  );
};
