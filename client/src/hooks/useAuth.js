import { useState, useEffect } from 'react';

import { SessionStorageService } from '../services/SessionStorageService';
import { ACCESS_TOKEN_KEY } from '../constants/storage';

export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(
    SessionStorageService.getItem(ACCESS_TOKEN_KEY),
  );

  useEffect(() => {
    setAuthenticated(SessionStorageService.getItem(ACCESS_TOKEN_KEY));
  }, []);

  return { authenticated };
};
