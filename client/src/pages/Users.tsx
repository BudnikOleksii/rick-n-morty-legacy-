import React, { useEffect } from 'react';
import { PATHS } from '../constants';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUsers } from '../features/users/users-selelctors';
import { usersLoadingStart } from '../features/users/users-slice';
import { UsersList } from '../components/organisms/UsersList';
import { useNavigate } from 'react-router-dom';
import { PageTemplate } from '../components/templates/PageTemplate';
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

      {users && users.length === 0 && <h2>No users found</h2>}
    </PageTemplate>
  );
};

export default Users;
