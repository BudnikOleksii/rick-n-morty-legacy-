import { ILogin, IAuthResponse, IRegistration } from '../types/auth';
import $api, { ENDPOINTS } from './index';
import { AxiosResponse } from 'axios';

export const logIn = async (data: ILogin): Promise<IAuthResponse> => {
  return $api.post<IAuthResponse>(ENDPOINTS.login, data).then((response) => response.data);
};

export const registration = async (data: IRegistration): Promise<IAuthResponse> => {
  return $api.post<IAuthResponse>(ENDPOINTS.registration, data).then((response) => response.data);
};

export const logout = async (refreshToken: string): Promise<void> => {
  return $api.post(ENDPOINTS.logout, refreshToken);
};
