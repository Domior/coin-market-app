import React from 'react';
import { Navigate } from 'react-router-dom';

import AppLayout from './layout/AppLayout';

import { AUTH_LINKS } from '../constants/links';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = () => {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <Navigate to={AUTH_LINKS.LOGIN} replace />;
  }

  return <AppLayout />;
};

export default ProtectedRoute;
