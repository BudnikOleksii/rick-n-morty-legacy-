import { AxiosResponse } from 'axios';
import $api, { ENDPOINTS } from './index';
import { ICharacter, ICharactersResponse } from '../types/character';

export const getCharacters = (
  params: string = ''
): Promise<AxiosResponse<ICharactersResponse[]>> => {
  return $api.get<ICharactersResponse[]>(ENDPOINTS.characters + params);
};

export const getCharacterById = (id: number): Promise<AxiosResponse<ICharacter>> => {
  return $api.get<ICharacter>(ENDPOINTS.characterById(id));
};
