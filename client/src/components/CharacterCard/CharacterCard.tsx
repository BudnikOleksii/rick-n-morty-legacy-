import { FC } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ICard } from '../../types/card';
import TransgenderIcon from '@mui/icons-material/Transgender';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import PublicIcon from '@mui/icons-material/Public';
import LanguageIcon from '@mui/icons-material/Language';
import { EpisodesModal } from '../EpisodesModal';

type Props = {
  card: ICard;
};
export const CharacterCard: FC<Props> = ({ card }) => {
  const { name, image, status, gender, type, species, origin, location, episodes } = card.character;

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia component="img" height="300" image={image} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>

        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              <MonitorHeartIcon />
            </ListItemIcon>

            <ListItemText primary={`Status: ${status}`} />
          </ListItem>

          <ListItem disablePadding>
            <ListItemIcon>
              <TransgenderIcon />
            </ListItemIcon>

            <ListItemText primary={`Gender: ${gender}`} />
          </ListItem>

          {type && (
            <ListItem disablePadding>
              <ListItemIcon>
                <Diversity3Icon />
              </ListItemIcon>

              <ListItemText primary={`Type: ${type}`} />
            </ListItem>
          )}

          {species && (
            <ListItem disablePadding>
              <ListItemIcon>
                <Diversity2Icon />
              </ListItemIcon>

              <ListItemText primary={`Species: ${species}`} />
            </ListItem>
          )}

          {origin && (
            <ListItem disablePadding>
              <ListItemIcon>
                <PublicIcon />
              </ListItemIcon>

              <ListItemText primary={`Origin: ${origin.name}`} />
            </ListItem>
          )}

          {location && (
            <ListItem disablePadding>
              <ListItemIcon>
                <LanguageIcon />
              </ListItemIcon>

              <ListItemText primary={`Location: ${location.name}`} />
            </ListItem>
          )}
        </List>
      </CardContent>

      <EpisodesModal episodes={episodes} />
    </Card>
  );
};
