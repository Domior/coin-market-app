import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { SessionStorageService } from '../services/SessionStorageService';
import { ACCESS_TOKEN_KEY } from '../constants/storage';
import { AUTH_LINKS } from '../constants/links';

const ProtectedRoute = () => {
  const authenticated = SessionStorageService.getItem(ACCESS_TOKEN_KEY);

  if (!authenticated) {
    return <Navigate to={AUTH_LINKS.LOGIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
