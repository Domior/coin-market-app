import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Dashboard from './pages/Dashboard';

import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';

import { AUTH_LINKS, APP_LINKS } from './constants/links';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate replace to={APP_LINKS.DASHBOARD} />} />
          <Route path={APP_LINKS.DASHBOARD} element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        <Route path="/" element={<PublicRoute />}>
          <Route path={AUTH_LINKS.SIGNUP} element={<SignUp />} />
          <Route path={AUTH_LINKS.LOGIN} element={<LogIn />} />
        </Route>

        <Route path="/" element={<Navigate to={AUTH_LINKS.LOGIN} />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </>
  );
};

export default App;
