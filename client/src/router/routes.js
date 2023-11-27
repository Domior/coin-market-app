import SignUp from '../pages/SignUp';
import LogIn from '../pages/LogIn';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Dashboard from '../pages/Dashboard';
import CoinDetails from '../pages/CoinDetails';
import Favorites from '../pages/Favorites';

import { AUTH_LINKS, APP_LINKS } from '../constants/links';

export const PUBLIC_ROUTES = [
  {
    path: AUTH_LINKS.SIGNUP,
    component: <SignUp />,
  },
  {
    path: AUTH_LINKS.LOGIN,
    component: <LogIn />,
  },
  {
    path: AUTH_LINKS.FORGOT_PASSWORD,
    component: <ForgotPassword />,
  },
  {
    path: AUTH_LINKS.RESET_PASSWORD,
    component: <ResetPassword />,
  },
];

export const PROTECTED_ROUTES = [
  {
    path: APP_LINKS.DASHBOARD,
    component: <Dashboard />,
  },
  {
    path: APP_LINKS.COIN_DETAILS,
    component: <CoinDetails />,
  },
  {
    path: APP_LINKS.FAVORITES,
    component: <Favorites />,
  },
];

export const NAV_ROUTES = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: APP_LINKS.DASHBOARD,
  },
  {
    key: 'favorites',
    label: 'Favorites',
    path: APP_LINKS.FAVORITES,
  },
];
