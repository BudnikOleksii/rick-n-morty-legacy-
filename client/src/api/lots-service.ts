import { AxiosResponse } from 'axios';
import $api, { ENDPOINTS } from './index';
import { ILotResponse } from '../types/lot';

export const getLots = (params: string = ''): Promise<AxiosResponse<ILotResponse[]>> => {
  return $api.get<ILotResponse[]>(ENDPOINTS.lots + params);
};
