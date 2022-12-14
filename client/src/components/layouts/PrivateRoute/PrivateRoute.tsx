import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import UnauthorizedPage from '../../../pages/Unauthorized';
import { getItemFromLocalStorage } from '../../../helpers/localstorage-helpers';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { checkAuthStart } from '../../../features/auth/auth-slice';
import { selectAuth } from '../../../features/auth/auth-selectors';

export const PrivateRoute: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector(selectAuth);

  if (isLoggedIn) {
    return <Outlet />;
  }

  const tokens = getItemFromLocalStorage('tokens');

  if (tokens) {
    dispatch(checkAuthStart());
  }

  return <UnauthorizedPage />;
};
