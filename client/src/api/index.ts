import axios from 'axios';
import { getItemFromLocalStorage, setItemToLocalStorage } from '../helpers/localstorage-helpers';
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
  userTransactions: (id: number) => `/users/${id}/transactions`,
  addRoleToUser: (id: number) => `/users/role/${id}`,
  sets: '/sets',
  setById: (id: number) => `/sets/${id}`,
  characters: '/characters',
  cards: '/cards',
  lots: '/lots',
  lotsPricesRange: '/lots/prices',
  lotById: (id: number) => `/lots/${id}`,
  locations: '/locations',
  chats: '/chats',
  chatById: (id: number | string) => `/chats/${id}`,
  chatMessages: (id: number | string) => `/chats/${id}/messages`,
};

const UNAUTHORIZED = 401;

const $api = axios.create({
  baseURL: BASE_URL,
});

$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${getItemFromLocalStorage('tokens')?.accessToken}`;
  }

  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config.data;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === UNAUTHORIZED) {
      try {
        const tokens = getItemFromLocalStorage('tokens');

        if (!tokens) {
          return;
        }

        const userData = await axios.post(BASE_URL + ENDPOINTS.refresh, {
          refreshToken: tokens.refreshToken,
        });

        setItemToLocalStorage('tokens', userData.data.tokens);

        return $api.request(originalRequest);
      } catch (error) {
        console.error(error);
        store.dispatch(setAuthDefaultState());
      }
    } else {
      throw error.response.data.errors;
    }
  }
);

export default $api;
