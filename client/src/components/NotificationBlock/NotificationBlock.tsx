import React, { FC } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Maybe } from '../../types/maybe';

interface Props {
  isloading: boolean;
  errors: Maybe<string[]>;
  onCloseNotification: () => void;
}

export const NotificationBlock: FC<Props> = ({ isloading, errors, onCloseNotification }) => {
  return (
    <>
      {isloading && <LinearProgress />}
      {errors && (
        <Snackbar open={!!errors} autoHideDuration={3000} onClose={onCloseNotification}>
          <Alert onClose={onCloseNotification} severity="error" sx={{ width: '100%' }}>
            {errors}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};
