import axios from 'axios';

import { SessionStorageService } from '../services/SessionStorageService';
import { ACCESS_TOKEN_KEY } from '../constants/storage';
import { STATUSES } from '../constants/statuses';
import { AUTH_LINKS } from '../constants/links';

import { AuthService } from './AuthService';

export const baseInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

baseInstance.interceptors.request.use(
  config => {
    const accessToken = SessionStorageService.getItem(ACCESS_TOKEN_KEY);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

baseInstance.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response.status === STATUSES.UNAUTHORIZED) {
      AuthService.logOut();
      SessionStorageService.removeItem(ACCESS_TOKEN_KEY);
      window.location = AUTH_LINKS.LOGIN;
      return;
    }
    return Promise.reject(error);
  },
);

export const commonInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});
