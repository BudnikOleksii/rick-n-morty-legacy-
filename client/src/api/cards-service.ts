import { AxiosResponse } from 'axios';
import { ICardResponse } from '../types/card';
import $api, { ENDPOINTS } from './index';

export const getCards = (params: string = ''): Promise<AxiosResponse<ICardResponse>> => {
  return $api.get<ICardResponse>(ENDPOINTS.cards + params);
};
