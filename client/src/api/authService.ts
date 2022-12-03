import { ILogin, IAuthResponse, IRegistration } from '../types/auth';
import $api, { BASE_URL, ENDPOINTS } from './index';
import axios from 'axios';
import { getItemFromLocalStorage } from '../helpers/localstorage-helpers';

export const logIn = (data: ILogin): Promise<IAuthResponse> => {
  return $api.post<IAuthResponse>(ENDPOINTS.login, data).then((response) => response.data);
};

export const registration = (data: IRegistration): Promise<IAuthResponse> => {
  return $api.post<IAuthResponse>(ENDPOINTS.registration, data).then((response) => response.data);
};

export const checkAuth = () => {
  const { refreshToken } = getItemFromLocalStorage('tokens');

  return axios
    .post<IAuthResponse>(BASE_URL + ENDPOINTS.refresh, {
      refreshToken,
    })
    .then((response) => response.data);
};

export const logout = async (refreshToken: string): Promise<void> => {
  return $api.post(ENDPOINTS.logout, refreshToken);
};
