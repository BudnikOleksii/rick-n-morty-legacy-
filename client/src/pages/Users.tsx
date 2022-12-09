import React, { useEffect } from 'react';
import { PATHS } from '../constants';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUsers } from '../features/users/users-selelctors';
import { usersLoadingStart, usersRemoveErrors } from '../features/users/users-slice';
import { UsersList } from '../components/organisms/UsersList';
import { useNavigate } from 'react-router-dom';
import { PageTemplate } from '../components/templates/PageTemplate';

const Users = () => {
  const navigate = useNavigate();
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
  const handlePageChange = (pageNumber: number) => {
    navigate(`${PATHS.users}?page=${pageNumber}`);
  };

  return (
    <PageTemplate
      title="Your cards"
      isLoading={usersIsloading}
      errors={usersErrors}
      onCloseNotification={handleCloseNotification}
      info={usersInfo}
      currentPage={Number(page)}
      onPageChange={handlePageChange}
    >
      {users && users.length > 0 && <UsersList users={users} />}

      {users && users.length === 0 && <h2>No users found</h2>}
    </PageTemplate>
  );
};

export default Users;
