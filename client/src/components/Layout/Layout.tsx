import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectAuth } from '../../features/auth/auth-selectors';
import LinearProgress from '@mui/material/LinearProgress';

export const Layout = () => {
  const { authIsloading, authErrors } = useAppSelector(selectAuth);
  console.log(authErrors);

  return (
    <main className="App">
      {authIsloading && <LinearProgress />}
      <Outlet />
    </main>
  );
};
