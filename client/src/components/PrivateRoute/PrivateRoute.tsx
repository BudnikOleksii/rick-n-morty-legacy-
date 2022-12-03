import { FC, ReactNode } from 'react';
import { getItemFromLocalStorage } from '../../helpers/localstorage-helpers';
import UnauthorizedPage from '../../pages/Unauthorized';

interface IProps {
  children: ReactNode;
}

export const PrivateRoute: FC<IProps> = ({ children }) => {
  const tokens = getItemFromLocalStorage('tokens');

  if (!tokens) {
    return <UnauthorizedPage />;
  }

  return <>{children}</>;
};
