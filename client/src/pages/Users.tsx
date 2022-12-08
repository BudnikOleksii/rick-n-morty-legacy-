import React, { useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import { PATHS } from '../constants';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUsers } from '../features/users/users-selelctors';
import { usersLoadingStart, usersRemoveErrors } from '../features/users/users-slice';
import { NotificationBlock } from '../components/organisms/NotificationBlock';
import { UsersList } from '../components/organisms/UsersList';
import { Heading } from '../components/molecules/Heading';
import { BasePagination } from '../components/molecules/BasePagination';

const Users = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const page = params.get('page');
  const dispatch = useAppDispatch();
  const { users, usersInfo, usersIsloading, usersErrors } = useAppSelector(selectUsers);

  useEffect(() => {
    dispatch(
      usersLoadingStart({
        params: `?page=${page || 1}`,
      })
    );
  }, [page]);

  const handleCloseNotification = () => dispatch(usersRemoveErrors());

  return (
    <Box component="main" sx={{ p: 3, width: '100%' }}>
      <Toolbar />
      <NotificationBlock
        isloading={usersIsloading}
        errors={usersErrors}
        onCloseNotification={handleCloseNotification}
      />

      <Heading title="Users" />

      {users && users.length > 0 && <UsersList users={users} />}

      {users && users.length === 0 && <h2>No users found</h2>}

      {usersInfo && usersInfo.total > 0 && (
        <BasePagination
          pages={usersInfo.pages}
          currentPage={Number(page)}
          baseEndpoint={PATHS.users}
        />
      )}
    </Box>
  );
};

export default Users;
