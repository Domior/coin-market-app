import React, { memo } from 'react';

import AppLayout from './AppLayout';
import AuthLayout from './AuthLayout';

const Layout = () => {
  const authenticated = false;

  if (authenticated) {
    return <AppLayout />;
  }

  return <AuthLayout />;
};

export default memo(Layout);
