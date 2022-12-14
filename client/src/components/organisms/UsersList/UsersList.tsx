import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import { UserCard } from '../UserCard';
import { GridItem } from '../../atoms/GridItem';
import { IUser } from '../../../types/user';

interface Props {
  users: IUser[];
}
export const UsersList: FC<Props> = ({ users }) => {
  return (
    <Grid container spacing={2}>
      {users.map((user) => (
        <GridItem key={user.id}>
          <UserCard user={user} />
        </GridItem>
      ))}
    </Grid>
  );
};
