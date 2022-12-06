import $api, { ENDPOINTS } from './index';
import { IUser } from '../types/user';
import { ICardResponse } from '../types/card';

export const getUsers = (): Promise<IUser[]> => {
  return $api.get<IUser[]>(ENDPOINTS.users).then((response) => response.data);
};

export const getUserCards = (id: number, params: string = ''): Promise<ICardResponse> => {
  return $api
    .get<ICardResponse>(ENDPOINTS.userCards(id) + params)
    .then((response) => response.data);
};
