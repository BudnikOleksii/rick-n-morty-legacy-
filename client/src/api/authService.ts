import { ILogin, ILoginResponse } from '../types/auth';
import axios from 'axios';
import { BASE_URL, ENDPOINTS } from './constants';

export const logIn = async (data: ILogin): Promise<ILoginResponse> => {
  const response = await axios.post(BASE_URL + ENDPOINTS.login, data);

  return response.data;
};
