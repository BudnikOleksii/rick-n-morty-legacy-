import { FC, ReactNode } from 'react';
import { getItemFromLocalStorage } from '../../helpers/localstorage-helpers';
import UnauthorizedPage from '../../pages/Unauthorized';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { checkAuthStart, selectUser } from '../../features/userSlice';

interface IProps {
  children: ReactNode;
}

export const PrivateRoute: FC<IProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector(selectUser);

  if (isLoggedIn) {
    return <>{children}</>;
  }

  const tokens = getItemFromLocalStorage('tokens');

  if (tokens) {
    dispatch(checkAuthStart());
  }

  return <UnauthorizedPage />;
};
