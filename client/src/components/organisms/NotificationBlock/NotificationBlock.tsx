import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { NotificationsAlert } from '../../molecules/NotificationsAlert';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectNotificationInfo } from '../../../features/actions-info/actions-info-selector';
import { setDefaultStatus } from '../../../features/actions-info/actions-info-slice';
import { MATERIAL_NAV_Z_INDEX } from '../../../constants';

export const NotificationBlock = () => {
  const dispatch = useAppDispatch();
  const { errors, actions, successMessages } = useAppSelector(selectNotificationInfo);

  const handleCloseNotification = () => dispatch(setDefaultStatus());

  return (
    <>
      {actions.length > 0 && (
        <LinearProgress
          color="secondary"
          sx={{ position: 'fixed', top: '0', zIndex: MATERIAL_NAV_Z_INDEX + 1, width: '100vw' }}
        />
      )}

      {successMessages.length > 0 && (
        <NotificationsAlert
          type="success"
          messages={successMessages}
          onClose={handleCloseNotification}
        />
      )}

      {errors && errors.length > 0 && (
        <NotificationsAlert type="error" messages={errors} onClose={handleCloseNotification} />
      )}
    </>
  );
};
