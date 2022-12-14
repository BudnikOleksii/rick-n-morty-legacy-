import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { ErrorAlert } from '../../molecules/ErrorAlert';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectNotificationInfo } from '../../../features/actions-info/actions-info-selector';
import { setDefaultStatus } from '../../../features/actions-info/actions-info-slice';
import { MATERIAL_NAV_Z_INDEX } from '../../../constants';

export const NotificationBlock = () => {
  const dispatch = useAppDispatch();
  const { errors, actions } = useAppSelector(selectNotificationInfo);

  const handleCloseNotification = () => dispatch(setDefaultStatus());

  return (
    <>
      {actions.length > 0 && (
        <LinearProgress
          color="secondary"
          sx={{ position: 'fixed', top: '0', zIndex: MATERIAL_NAV_Z_INDEX + 1, width: '100vw' }}
        />
      )}

      {errors && errors.length > 0 && (
        <ErrorAlert errors={errors} onClose={handleCloseNotification} />
      )}
    </>
  );
};
