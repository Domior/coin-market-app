import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { SessionStorageService } from '../services/SessionStorageService';
import { ACCESS_TOKEN_KEY } from '../constants/storage';
import { APP_LINKS } from '../constants/links';

const PublicRoute = () => {
  const authenticated = SessionStorageService.getItem(ACCESS_TOKEN_KEY);

  return authenticated ? <Navigate to={APP_LINKS.DASHBOARD} /> : <Outlet />;
};

export default PublicRoute;
