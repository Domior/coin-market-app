import axios from 'axios';

import { SessionStorageService } from '../services/SessionStorageService';
import { ACCESS_TOKEN_KEY } from '../constants/storage';

export const googleInstance = axios.create({
  headers: {
    Authorization: `Bearer ${SessionStorageService.getItem(ACCESS_TOKEN_KEY)}`,
    Accept: 'application/json',
  },
});

export const baseInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});
