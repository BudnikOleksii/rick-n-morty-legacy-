import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectAuth } from '../../features/auth/auth-selectors';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import { ListItem, ListItemText } from '@mui/material';

export const Layout = () => {
  const { authIsloading, authErrors } = useAppSelector(selectAuth);

  return (
    <main className="App">
      {authIsloading && <LinearProgress />}
      {authErrors && authErrors.length > 0 && (
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
