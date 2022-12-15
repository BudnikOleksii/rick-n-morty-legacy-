import React, { FC, ReactNode } from 'react';
import { IUser } from '../../../types/user';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

interface Props {
  user: Omit<IUser, 'roles'>;
  children?: ReactNode;
}

export const UserListItem: FC<Props> = ({ user, children }) => {
  return (
    <ListItem>
      <ListItemIcon>
        <Avatar alt={user.username}>{user.username.slice(0, 2)}</Avatar>
      </ListItemIcon>
      <ListItemText primary={user.username}></ListItemText>
      {children}
    </ListItem>
  );
};
