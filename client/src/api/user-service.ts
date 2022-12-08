import $api, { ENDPOINTS } from './index';
import { IUserResponse, IUsersResponse } from '../types/user';
import { ICardResponse } from '../types/card';

export const getUsers = (params: string = ''): Promise<IUsersResponse[]> => {
  return $api.get<IUsersResponse[]>(ENDPOINTS.users + params).then((response) => response.data);
};

export const getUserCards = (id: number, params: string = ''): Promise<ICardResponse> => {
  return $api
    .get<ICardResponse>(ENDPOINTS.userCards(id) + params)
    .then((response) => response.data);
};

export const addNewRole = (id: number, role: string): Promise<IUserResponse> => {
  return $api
    .patch<IUserResponse>(ENDPOINTS.addRoleToUser(id), { role })
    .then((response) => response.data);
};
