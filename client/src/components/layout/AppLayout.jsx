import React from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="flex flex-col h-full">
      <Outlet />
    </div>
  );
};

export default AppLayout;
