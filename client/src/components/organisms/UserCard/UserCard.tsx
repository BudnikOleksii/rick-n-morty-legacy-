import { FC } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import StarRateIcon from '@mui/icons-material/StarRate';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import DnsIcon from '@mui/icons-material/Dns';
import EventIcon from '@mui/icons-material/Event';
import { ListItemComponent } from '../../molecules/ListItemComponent';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAuth } from '../../../features/auth/auth-selectors';
import { addNewRoleStart } from '../../../features/users/users-slice';
import { registerAction } from '../../../features/actions-info/actions-info-slice';
import { checkIsAdmin } from '../../../helpers/check-is-admin';
import { getLocalDate, getLocalTime } from '../../../helpers/date-helpers';
import { ADMIN_ROLE } from '../../../constants';
import { IUser } from '../../../types/user';

type Props = {
  user: IUser;
};

export const UserCard: FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const { id, username, rating, roles, ip, registration_date, last_visit_date } = user;
  const { isAdmin } = useAppSelector(selectAuth);
  const hasAdminRole = checkIsAdmin(roles);

  const handleAddNewRole = (role: string = ADMIN_ROLE) => {
    dispatch(registerAction(addNewRoleStart.type));
    dispatch(
      addNewRoleStart({
        id,
        role,
      })
    );
  };

  return (
    <Card sx={{ maxWidth: '100%' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {username}
        </Typography>

        <List>
          <ListItemComponent name="Rating" value={rating} icon={<StarRateIcon />} />

          {roles.map((role) => (
            <ListItemComponent
              key={role.id}
              name="Role"
              value={role.title}
              icon={<SupervisorAccountIcon />}
            />
          ))}

          <ListItemComponent name="Ip address" value={ip} icon={<DnsIcon />} />
          <ListItemComponent
            name="Registration date"
            value={getLocalDate(registration_date)}
            icon={<EventIcon />}
          />
          <ListItemComponent
            name="Last seen"
            value={getLocalTime(last_visit_date)}
            icon={<EventIcon />}
          />
        </List>

        {isAdmin && !hasAdminRole && (
          <Button onClick={() => handleAddNewRole()}>Add admin role</Button>
        )}
      </CardContent>
    </Card>
  );
};
