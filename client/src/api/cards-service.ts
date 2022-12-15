import { AxiosResponse } from 'axios';
import { ICard, ICardResponse } from '../types/card';
import $api, { ENDPOINTS } from './index';

export const getCards = (params: string = ''): Promise<AxiosResponse<ICardResponse>> => {
  return $api.get<ICardResponse>(ENDPOINTS.cards + params);
};

export const createNewCard = (characterId: number): Promise<AxiosResponse<ICard>> => {
  return $api.post<ICard>(ENDPOINTS.cards, { characterId });
};
