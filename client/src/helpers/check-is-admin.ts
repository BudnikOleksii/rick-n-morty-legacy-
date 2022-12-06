import { IRole } from '../types/user';
import { ADMIN_ROLE } from '../constants';

export const checkIsAdmin = (roles: IRole[]) => {
  return roles.some((role) => role.title === ADMIN_ROLE);
};
