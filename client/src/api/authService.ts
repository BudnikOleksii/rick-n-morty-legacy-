import { ILogin, ILoginResponse } from '../types/auth';
import $api, { BASE_URL, ENDPOINTS } from './index';
import { AxiosResponse } from 'axios';

export const logIn = async (
  data: ILogin
): Promise<AxiosResponse<ILoginResponse>> => {
  return $api.post(ENDPOINTS.login, data).then((response) => response.data);
};
