import React, { FC } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

interface Props {
  type: 'success' | 'info' | 'warning' | 'error';
  messages: string[];
  onClose: () => void;
}

export const NotificationsAlert: FC<Props> = ({ type, messages, onClose }) => {
  return (
    <Snackbar open={!!messages} autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
        {messages.map((msg) => (
          <ListItem disablePadding key={msg}>
            <ListItemText primary={msg} />
          </ListItem>
        ))}
      </Alert>
    </Snackbar>
  );
};
