import axios from 'axios';
import { getItemFromLocalStorage } from '../helpers/localstorage-helpers';

const PORT = process.env.PORT || 8080;
export const BASE_URL = `http://localhost:${PORT}/v1`;

export const ENDPOINTS = {
  login: '/auth/login',
  registration: '/auth/registration',
};

const $api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${getItemFromLocalStorage('tokens')?.accessToken}`;
  }

  return config;
});

export default $api;
