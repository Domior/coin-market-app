import React from 'react';

import App from '../../App';

const AppLayout = props => {
  return (
    <div className="bg-blue-600">
      <App {...props} />
    </div>
  );
};

export default AppLayout;
