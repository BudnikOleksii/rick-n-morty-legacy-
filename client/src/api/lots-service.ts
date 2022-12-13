import { AxiosResponse } from 'axios';
import $api, { ENDPOINTS } from './index';
import { ILot, ILotResponse, INewLot } from '../types/lot';

export const getLots = (params: string = ''): Promise<AxiosResponse<ILotResponse[]>> => {
  return $api.get<ILotResponse[]>(ENDPOINTS.lots + params);
};

export const handleBet = (id: number, bet: number): Promise<AxiosResponse<ILot>> => {
  return $api.patch<ILot>(ENDPOINTS.lotById(id), { bet });
};

export const createLot = (lotData: INewLot): Promise<AxiosResponse<ILot>> => {
  return $api.post<ILot>(ENDPOINTS.lots, lotData);
};
