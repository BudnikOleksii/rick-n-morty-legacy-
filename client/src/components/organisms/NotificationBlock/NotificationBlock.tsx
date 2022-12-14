import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { ErrorAlert } from '../../molecules/ErrorAlert';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectNotificationInfo } from '../../../features/notification-info/notification-info-selector';
import { setDefaultStatus } from '../../../features/notification-info/notification-info-slice';
import { MATERIAL_NAV_Z_INDEX } from '../../../constants';

export const NotificationBlock = () => {
  const dispatch = useAppDispatch();
  const { errors, actions } = useAppSelector(selectNotificationInfo);
  console.log(actions);

  const handleCloseNotification = () => dispatch(setDefaultStatus());

  return (
    <>
      {actions.length > 0 && (
        <LinearProgress
          color="secondary"
          sx={{ position: 'fixed', top: '0', zIndex: MATERIAL_NAV_Z_INDEX + 1, width: '100vw' }}
        />
      )}

      {/*{status === 'SUCCEEDED' && (*/}
      {/*  <Snackbar*/}
      {/*    open={status === 'SUCCEEDED'}*/}
      {/*    autoHideDuration={3000}*/}
      {/*    onClose={handleCloseNotification}*/}
      {/*  >*/}
      {/*    <Alert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>*/}
      {/*      Success*/}
      {/*    </Alert>*/}
      {/*  </Snackbar>*/}
      {/*)}*/}

      {errors && errors.length > 0 && (
        <ErrorAlert errors={errors} onClose={handleCloseNotification} />
      )}
    </>
  );
};
