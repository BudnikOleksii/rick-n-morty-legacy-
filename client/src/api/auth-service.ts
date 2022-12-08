import { ILogin, IAuthResponse, IRegistration, ILogoutResponse } from '../types/auth';
import $api, { BASE_URL, ENDPOINTS } from './index';
import axios, { AxiosResponse } from 'axios';
import { getItemFromLocalStorage } from '../helpers/localstorage-helpers';

export const logIn = (data: ILogin): Promise<AxiosResponse<IAuthResponse>> => {
  return $api.post<IAuthResponse, any>(ENDPOINTS.login, data);
};

export const registration = (data: IRegistration): Promise<AxiosResponse<IAuthResponse>> => {
  return $api.post<IAuthResponse>(ENDPOINTS.registration, data);
};

export const checkAuth = (): Promise<AxiosResponse<IAuthResponse>> => {
  const { refreshToken } = getItemFromLocalStorage('tokens');

  return axios.post<IAuthResponse>(BASE_URL + ENDPOINTS.refresh, {
    refreshToken,
  });
};

export const logout = (): Promise<AxiosResponse<ILogoutResponse>> => {
  const { refreshToken } = getItemFromLocalStorage('tokens');

  return $api.post<ILogoutResponse>(ENDPOINTS.logout, { refreshToken });
};
