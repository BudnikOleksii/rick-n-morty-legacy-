import { FC } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import List from '@mui/material/List';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ListItem from '@mui/material/ListItem';
import { ListItemComponent } from '../../molecules/ListItemComponent';
import { getLocalDate } from '../../../helpers/date-helpers';
import { IEpisode } from '../../../types/episode';

interface Props {
  episode: IEpisode;
}

export const EpisodeItem: FC<Props> = ({ episode }) => {
  return (
    <ListItem>
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
            <ListItemComponent name="Code" value={episode.episode} icon={<LiveTvIcon />} />
            <ListItemComponent
              name="Air date"
              value={getLocalDate(episode.air_date)}
              icon={<EventAvailableIcon />}
            />
          </List>
        </AccordionDetails>
      </Accordion>
    </ListItem>
  );
};
