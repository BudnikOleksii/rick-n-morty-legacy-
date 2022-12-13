import { AxiosResponse } from 'axios';
import $api, { ENDPOINTS } from './index';
import { ILocation } from '../types/location';

export const getLocations = (): Promise<AxiosResponse<ILocation[]>> => {
  return $api.get<ILocation[]>(ENDPOINTS.locations);
};
