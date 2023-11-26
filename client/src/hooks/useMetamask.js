import { useState, useEffect, useCallback } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { STATUSES } from '../constants/statuses';
import { AuthService } from '../services/AuthService';
import { SessionStorageService } from '../services/SessionStorageService';
import { APP_LINKS } from '../constants/links';
import { ACCESS_TOKEN_KEY } from '../constants/storage';
import { getErrorMessage } from '../helpers/getErrorMessage';

export const useMetamask = () => {
  const navigate = useNavigate();
  const [hasProvider, setHasProvider] = useState(null);

  const getProvider = useCallback(async () => {
    const provider = await detectEthereumProvider({ silent: true });
    setHasProvider(Boolean(provider));
  }, []);

  const loginWithMetamask = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const {
        data: { message, token },
      } = await AuthService.logInMetamask({
        metamaskAddress: accounts[0],
      });
      SessionStorageService.setItem(ACCESS_TOKEN_KEY, token);
      toast.success(message);
      navigate(APP_LINKS.DASHBOARD);
    } catch (error) {
      toast.error(error?.code === STATUSES.METAMASK_ERROR ? 'Enter password in metamask extension please' : getErrorMessage(error));
    }
  };

  useEffect(() => {
    getProvider();
  }, [getProvider]);

  return { hasProvider, loginWithMetamask };
};
