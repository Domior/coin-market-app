import React from 'react';

import App from '../../App';

const AuthLayout = props => {
  return (
    <div className="flex items-center justify-center h-full">
      <App {...props} />
    </div>
  );
};

export default AuthLayout;
