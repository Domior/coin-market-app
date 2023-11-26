import React from 'react';
import { Button, Divider } from 'antd';

import { useMetamask } from '../hooks/useMetamask';

const MetamaskButton = () => {
  const { hasProvider, loginWithMetamask } = useMetamask();

  return (
    hasProvider && (
      <div className="mt-4 flex flex-col items-center">
        <Divider plain>or</Divider>
        <Button onClick={loginWithMetamask} className="w-fit bg-orange-400 text-white">
          Login with MetaMask
        </Button>
      </div>
    )
  );
};

export default MetamaskButton;
