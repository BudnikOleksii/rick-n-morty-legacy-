import React, { useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import { PATHS } from '../constants';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUsers } from '../features/users/users-selelctors';
import { usersLoadingStart, usersRemoveErrors } from '../features/users/users-slice';
import { UserCard } from '../components/UserCard';

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
      {usersIsloading && <LinearProgress />}

      {usersErrors && (
        <Snackbar open={!!usersErrors} autoHideDuration={3000} onClose={handleCloseNotification}>
          <Alert onClose={handleCloseNotification} severity="error" sx={{ width: '100%' }}>
            {usersErrors}
          </Alert>
        </Snackbar>
      )}

      {users && users.length > 0 && (
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
      )}

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
