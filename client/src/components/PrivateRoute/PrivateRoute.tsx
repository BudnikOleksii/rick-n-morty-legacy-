import { FC, ReactNode } from 'react';
import { getItemFromLocalStorage } from '../../helpers/localstorage-helpers';
import UnauthorizedPage from '../../pages/Unauthorized';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { checkAuthStart } from '../../features/auth/auth-slice';
import { selectAuth } from '../../features/auth/auth-selectors';

interface IProps {
  children: ReactNode;
}

export const PrivateRoute: FC<IProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector(selectAuth);

  if (isLoggedIn) {
    return <>{children}</>;
  }

  const tokens = getItemFromLocalStorage('tokens');

  if (tokens) {
    dispatch(checkAuthStart());
  }

  return <UnauthorizedPage />;
};
