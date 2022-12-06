import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { IEpisode } from '../../types/episode';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { getLocalDate } from '../../helpers/date-helpers';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxHeight: '50vh',
  maxWidth: 400,
  overflow: 'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props {
  episodes: IEpisode[];
}

export const EpisodesModal: FC<Props> = ({ episodes }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Episodes info</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
        </Box>
      </Modal>
    </div>
  );
};
