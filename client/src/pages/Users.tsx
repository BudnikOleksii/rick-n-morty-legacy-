import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { PageTemplate } from '../components/templates/PageTemplate';
import { UsersList } from '../components/organisms/UsersList';
import { PATHS } from '../constants';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUsers } from '../features/users/users-selelctors';
import { usersLoadingStart } from '../features/users/users-slice';
import { useNavigate } from 'react-router-dom';
import { registerAction } from '../features/actions-info/actions-info-slice';

const Users = () => {
  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const page = params.get('page');
  const dispatch = useAppDispatch();
  const { users, usersInfo } = useAppSelector(selectUsers);

  useEffect(() => {
    dispatch(registerAction(usersLoadingStart.type));
    dispatch(
      usersLoadingStart({
        params: `?page=${page || 1}`,
      })
    );
  }, [page]);

  const handlePageChange = (pageNumber: number) => {
    navigate(`${PATHS.users}?page=${pageNumber}`);
  };

  return (
    <PageTemplate
      title="Users"
      info={usersInfo}
      currentPage={Number(page)}
      onPageChange={handlePageChange}
    >
      {users && users.length > 0 && <UsersList users={users} />}

      {users && users.length === 0 && <Typography variant="h5">No users found</Typography>}
    </PageTemplate>
  );
};

export default Users;
