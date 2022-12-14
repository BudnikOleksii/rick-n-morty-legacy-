import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { ErrorAlert } from '../../molecules/ErrorAlert';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectNotificationInfo } from '../../../features/notification-info/notification-info-selector';
import { setDefaultStatus } from '../../../features/notification-info/notification-info-slice';
import { MATERIAL_NAV_Z_INDEX } from '../../../constants';

export const NotificationBlock = () => {
  const dispatch = useAppDispatch();
  const { status, errors } = useAppSelector(selectNotificationInfo);

  const handleCloseNotification = () => dispatch(setDefaultStatus());

  return (
    <>
      {status === 'PENDING' && (
        <LinearProgress
          color="secondary"
          sx={{ position: 'fixed', top: '0', zIndex: MATERIAL_NAV_Z_INDEX + 1, width: '100vw' }}
        />
      )}

      {status === 'SUCCEEDED' && (
        <Snackbar
          open={status === 'SUCCEEDED'}
          autoHideDuration={3000}
          onClose={handleCloseNotification}
        >
          <Alert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>
            Success
          </Alert>
        </Snackbar>
      )}

      {errors && errors.length > 0 && (
        <ErrorAlert errors={errors} onClose={handleCloseNotification} />
      )}
    </>
  );
};
