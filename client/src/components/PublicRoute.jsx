import React from 'react';
import { Navigate } from 'react-router-dom';

import AuthLayout from './layout/AuthLayout';

import { APP_LINKS } from '../constants/links';
import { useAuth } from '../hooks/useAuth';

const PublicRoute = () => {
  const { authenticated } = useAuth();

  if (authenticated) {
    return <Navigate to={APP_LINKS.DASHBOARD} replace />;
  }

  return <AuthLayout />;
};

export default PublicRoute;
