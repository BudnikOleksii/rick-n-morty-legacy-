import { FC } from 'react';
import ListItem from '@mui/material/ListItem';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import ListItemText from '@mui/material/ListItemText';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { getLocalDate } from '../../helpers/date-helpers';
import { IEpisode } from '../../types/episode';

interface Props {
  episodes: IEpisode[];
}

export const EpisodesList: FC<Props> = ({ episodes }) => {
  return (
    <List>
      {episodes.map((episode) => (
        <ListItem key={episode.id}>
          <Accordion sx={{ width: '100%' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{episode.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <LiveTvIcon />
                  </ListItemIcon>
                  <ListItemText primary={`Code: ${episode.episode}`} />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <EventAvailableIcon />
                  </ListItemIcon>
                  <ListItemText primary={`Air date: ${getLocalDate(episode.air_date)}`} />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </ListItem>
      ))}
    </List>
  );
};
