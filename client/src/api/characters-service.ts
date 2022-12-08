import { AxiosResponse } from 'axios';
import $api, { ENDPOINTS } from './index';
import { ICharactersResponse } from '../types/character';

export const getCharacters = (
  params: string = ''
): Promise<AxiosResponse<ICharactersResponse[]>> => {
  return $api.get<ICharactersResponse[]>(ENDPOINTS.characters + params);
};
