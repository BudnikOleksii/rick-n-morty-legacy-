import $api, { ENDPOINTS } from './index';
import { ISetResponse } from '../types/set';

export const getSets = (params: string = ''): Promise<ISetResponse[]> => {
  return $api.get<ISetResponse[]>(ENDPOINTS.sets + params).then((response) => response.data);
};
