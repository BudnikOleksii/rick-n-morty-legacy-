import $api, { ENDPOINTS } from './index';
import { ISet, ISetsResponse } from '../types/set';
import { AxiosResponse } from 'axios';

export const getSets = (params: string = ''): Promise<AxiosResponse<ISetsResponse[]>> => {
  return $api.get<ISetsResponse[]>(ENDPOINTS.sets + params);
};

export const createSet = (name: string): Promise<AxiosResponse<ISet>> => {
  return $api.post<ISet>(ENDPOINTS.sets, { name });
};

export const deleteSet = (id: number): Promise<AxiosResponse<number>> => {
  return $api.delete<number>(ENDPOINTS.setById(id));
};
