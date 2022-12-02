import { ILogin, ILoginResponse, IRegistration } from '../types/auth';
import $api, { ENDPOINTS } from './index';
import { AxiosResponse } from 'axios';

export const logIn = async (data: ILogin): Promise<AxiosResponse<ILoginResponse>> => {
  return $api.post(ENDPOINTS.login, data).then((response) => response.data);
};

export const registration = async (data: IRegistration): Promise<AxiosResponse<ILoginResponse>> => {
  return $api.post(ENDPOINTS.registration, data).then((response) => response.data);
};
