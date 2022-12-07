import React, { FC } from 'react';
import { IUser } from '../../types/user';
import Grid from '@mui/material/Grid';
import { UserCard } from '../UserCard';

interface Props {
  users: IUser[];
}
export const UsersList: FC<Props> = ({ users }) => {
  return (
    <Grid container spacing={2}>
      {users.map((user) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          display="flex"
          justifyContent="center"
          key={user.id}
        >
          <UserCard user={user} />
        </Grid>
      ))}
    </Grid>
  );
};
