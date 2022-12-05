import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectAuth } from '../../features/auth/auth-selectors';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';

export const Layout = () => {
  const { authIsloading, authErrors } = useAppSelector(selectAuth);

  // TODO if something loading render loader
  const isLoading = authIsloading;

  return (
    <main className="App">
      {isLoading && <LinearProgress />}
      {authErrors && (
        <Alert
          sx={{ maxWidth: '400px', margin: '15px', position: 'sticky' }}
          severity="error"
          onClose={() => {}}
        >
          {authErrors.map((errorMsg) => (
            <ListItem disablePadding key={errorMsg}>
              <ListItemText primary={errorMsg} />
            </ListItem>
          ))}
        </Alert>
      )}
      <Outlet />
    </main>
  );
};
