import React, { useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Pagination from '@mui/material/Pagination';
import { PATHS } from '../constants';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUsers } from '../features/users/users-selelctors';
import { usersLoadingStart, usersRemoveErrors } from '../features/users/users-slice';
import { NotificationBlock } from '../components/NotificationBlock';
import { UsersList } from '../components/UsersList';
import { Heading } from '../components/Heading';

const Users = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const page = params.get('page');

  const navigate = useNavigate();
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
        <Pagination
          sx={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}
          count={usersInfo.pages}
          variant="outlined"
          shape="rounded"
          page={Number(page) || 1}
          onChange={(_, pageNumber) => {
            navigate(`${PATHS.users}?page=${pageNumber}`);
          }}
        />
      )}
    </Box>
  );
};

export default Users;
