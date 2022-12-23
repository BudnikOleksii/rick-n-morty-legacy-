import { AxiosResponse } from 'axios';
import $api, { ENDPOINTS } from './index';
import { IPaymentData, IPaymentResponse } from '../types/payment-types';

export const replenishBalance = (
  paymentData: IPaymentData
): Promise<AxiosResponse<IPaymentResponse>> => {
  return $api.post<IPaymentResponse>(ENDPOINTS.replenishBalance, paymentData);
};

export const withdraw = (
  paymentData: Omit<IPaymentData, 'token'>
): Promise<AxiosResponse<IPaymentResponse>> => {
  return $api.post<IPaymentResponse>(ENDPOINTS.withdraw, paymentData);
};
