import React from 'react';
import { Outlet } from 'react-router-dom';
import { NotificationBlock } from '../../organisms/NotificationBlock';

export const Layout = () => {
  return (
    <main className="App">
      <NotificationBlock />

      <Outlet />
    </main>
  );
};
