import SignUp from '../pages/SignUp';
import LogIn from '../pages/LogIn';
import Dashboard from '../pages/Dashboard';
import CoinDetails from '../pages/CoinDetails';

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
];
