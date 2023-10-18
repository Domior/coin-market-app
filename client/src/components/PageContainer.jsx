import React from 'react';

import Header from './Header';

const PageContainer = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default PageContainer;
