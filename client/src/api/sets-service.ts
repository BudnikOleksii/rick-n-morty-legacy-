import $api, { ENDPOINTS } from './index';
import { ISetResponse } from '../types/set';
import { AxiosResponse } from 'axios';

export const getSets = (params: string = ''): Promise<AxiosResponse<ISetResponse[]>> => {
  return $api.get<ISetResponse[]>(ENDPOINTS.sets + params);
};
