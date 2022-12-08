import React, { FC } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { ListItem, ListItemText } from '@mui/material';

interface Props {
  errors: string[];
  onClose: () => void;
}

export const ErrorAlert: FC<Props> = ({ errors, onClose }) => {
  return (
    <Snackbar open={!!errors} autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
        {errors.map((errorMsg) => (
          <ListItem disablePadding key={errorMsg}>
            <ListItemText primary={errorMsg} />
          </ListItem>
        ))}
      </Alert>
    </Snackbar>
  );
};
