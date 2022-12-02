import $api, { ENDPOINTS } from './index';
import { IUser } from '../types/user';

export const getUsers = async (): Promise<IUser[]> => {
  return $api.get<IUser[]>(ENDPOINTS.users).then((response) => response.data);
};
