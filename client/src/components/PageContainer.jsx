import React from 'react';

import Header from './Header';

const PageContainer = ({ component }) => {
  return (
    <>
      <Header />
      {component}
    </>
  );
};

export default PageContainer;
