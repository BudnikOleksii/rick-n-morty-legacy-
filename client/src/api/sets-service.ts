import $api, { ENDPOINTS } from './index';
import { ISetsResponse } from '../types/set';
import { AxiosResponse } from 'axios';

export const getSets = (params: string = ''): Promise<AxiosResponse<ISetsResponse[]>> => {
  return $api.get<ISetsResponse[]>(ENDPOINTS.sets + params);
};
