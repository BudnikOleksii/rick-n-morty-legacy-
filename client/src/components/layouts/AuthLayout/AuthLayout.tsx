import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAuth } from '../../../features/auth/auth-selectors';
import { NotificationBlock } from '../../organisms/NotificationBlock';
import { authRemoveErrors } from '../../../features/auth/auth-slice';

export const AuthLayout = () => {
  const dispatch = useAppDispatch();
  const { authIsloading, authErrors } = useAppSelector(selectAuth);
  const handleCloseNotification = () => dispatch(authRemoveErrors());

  return (
    <main className="App">
      <NotificationBlock
        isloading={authIsloading}
        errors={authErrors}
        onCloseNotification={handleCloseNotification}
      />

      <Outlet />
    </main>
  );
};
