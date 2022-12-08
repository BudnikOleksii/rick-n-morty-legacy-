import $api, { ENDPOINTS } from './index';
import { IUser, IUsersResponse } from '../types/user';
import { ICardResponse } from '../types/card';
import { AxiosResponse } from 'axios';

export const getUsers = (params: string = ''): Promise<AxiosResponse<IUsersResponse[]>> => {
  return $api.get<IUsersResponse[]>(ENDPOINTS.users + params);
};

export const getUserCards = (
  id: number,
  params: string = ''
): Promise<AxiosResponse<ICardResponse>> => {
  return $api.get<ICardResponse>(ENDPOINTS.userCards(id) + params);
};

export const addNewRole = (id: number, role: string): Promise<AxiosResponse<IUser>> => {
  return $api.patch<IUser>(ENDPOINTS.addRoleToUser(id), { role });
};
