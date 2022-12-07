import { FC } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { Maybe } from '../../../types/maybe';
import { ErrorAlert } from '../../molecules/ErrorAlert';

interface Props {
  isloading: boolean;
  errors: Maybe<string[]>;
  onCloseNotification: () => void;
}

export const NotificationBlock: FC<Props> = ({ isloading, errors, onCloseNotification }) => {
  return (
    <>
      {isloading && <LinearProgress />}
      {errors && errors.length > 0 && <ErrorAlert errors={errors} onClose={onCloseNotification} />}
    </>
  );
};
