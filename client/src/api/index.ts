import axios from 'axios';
import { getItemFromLocalStorage, setItemToLocalStorage } from '../helpers/localstorage-helpers';
import { checkAuth } from './auth-service';
import { instanceOfErrorResponse } from '../types/response';
import { store } from '../app/store';
import { setAuthDefaultState } from '../features/auth/auth-slice';

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
  sets: '/sets',
};

const UNAUTHORIZED = 401;

const $api = axios.create({
  baseURL: BASE_URL,
  validateStatus: function (status) {
    return status < 501 && status !== 401;
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

    if (error.response.status === UNAUTHORIZED) {
      try {
        const userData = await checkAuth();

        if (instanceOfErrorResponse(userData)) {
          throw userData.errors;
        }

        setItemToLocalStorage('tokens', userData.tokens);

        return $api.request(originalRequest);
      } catch (error) {
        console.error(error);
        store.dispatch(setAuthDefaultState());
      }
    }
  }
);

export default $api;
