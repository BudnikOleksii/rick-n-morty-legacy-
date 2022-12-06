import { FC } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IUser } from '../../types/user';
import StarRateIcon from '@mui/icons-material/StarRate';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import DnsIcon from '@mui/icons-material/Dns';
import EventIcon from '@mui/icons-material/Event';
import { getLocalDate, getLocalTime } from '../../helpers/date-helpers';

type Props = {
  user: IUser;
};
export const UserCard: FC<Props> = ({ user }) => {
  const { id, username, rating, roles, ip, registration_date, last_visit_date } = user;

  return (
    <Card sx={{ maxWidth: '100%' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {username}
        </Typography>

        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              <StarRateIcon />
            </ListItemIcon>

            <ListItemText primary={`Rating: ${rating}`} />
          </ListItem>

          {roles.map((role) => (
            <ListItem disablePadding key={role.id}>
              <ListItemIcon>
                <SupervisorAccountIcon />
              </ListItemIcon>

              <ListItemText primary={`Role: ${role.title}`} />
            </ListItem>
          ))}

          <ListItem disablePadding>
            <ListItemIcon>
              <DnsIcon />
            </ListItemIcon>

            <ListItemText primary={`Ip address: ${ip}`} />
          </ListItem>

          <ListItem disablePadding>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>

            <ListItemText primary={`Registration date: ${getLocalDate(registration_date)}`} />
          </ListItem>

          <ListItem disablePadding>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>

            <ListItemText primary={`Last seen: ${getLocalTime(last_visit_date)}`} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};
