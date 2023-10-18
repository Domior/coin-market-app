import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import PageContainer from './components/PageContainer';

import { PUBLIC_ROUTES, PROTECTED_ROUTES } from './router/routes';
import { AUTH_LINKS, APP_LINKS } from './constants/links';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate replace to={APP_LINKS.DASHBOARD} />} />
          {PROTECTED_ROUTES.map(({ path, component }, index) => (
            <Route
              key={index}
              path={path}
              element={<PageContainer component={component} />}
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        <Route path="/" element={<PublicRoute />}>
          {PUBLIC_ROUTES.map(({ path, component }, index) => (
            <Route key={index} path={path} element={component} />
          ))}
        </Route>
        <Route path="/" element={<Navigate to={AUTH_LINKS.LOGIN} />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </>
  );
};

export default App;
