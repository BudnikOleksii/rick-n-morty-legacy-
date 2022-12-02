import axios from 'axios';
import { getItemFromLocalStorage, setItemToLocalStorage } from '../helpers/localstorage-helpers';
import { IAuthResponse } from '../types/auth';

const PORT = process.env.PORT || 8080;
export const BASE_URL = `http://localhost:${PORT}/v1`;

export const ENDPOINTS = {
  login: '/auth/login',
  registration: '/auth/registration',
  logout: '/auth/logout',
  refresh: '/auth/refresh',
  users: '/users',
};

const $api = axios.create({ baseURL: BASE_URL });

$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${getItemFromLocalStorage('tokens')?.accessToken}`;
  }

  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      try {
        const { refreshToken } = getItemFromLocalStorage('tokens');
        const { data } = await axios.post<IAuthResponse>(BASE_URL + ENDPOINTS.refresh, {
          refreshToken,
        });

        setItemToLocalStorage('tokens', data.tokens);

        return $api.request(originalRequest);
      } catch (error) {
        console.error(error);
      }
    }
  }
);

export default $api;
