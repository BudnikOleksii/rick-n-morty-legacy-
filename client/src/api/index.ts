import axios from 'axios';
import { getItemFromLocalStorage, setItemToLocalStorage } from '../helpers/localstorage-helpers';
import { checkAuth } from './auth-service';

const PORT = process.env.PORT || 8080;
export const BASE_URL = `http://localhost:${PORT}/v1`;

export const ENDPOINTS = {
  login: '/auth/login',
  registration: '/auth/registration',
  logout: '/auth/logout',
  refresh: '/auth/refresh',
  users: '/users',
  userCards: (id: number) => `/users/${id}/cards`,
  addRoleToUser: (id: number) => `/users/role/${id}`,
};

const $api = axios.create({
  baseURL: BASE_URL,
  validateStatus: function (status) {
    return status < 500;
  },
});

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
        const { tokens } = await checkAuth();

        setItemToLocalStorage('tokens', tokens);

        return $api.request(originalRequest);
      } catch (error) {
        console.error(error);
      }
    }
  }
);

export default $api;
