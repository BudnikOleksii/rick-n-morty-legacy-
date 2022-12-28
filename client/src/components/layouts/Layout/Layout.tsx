import React from 'react';
import { Outlet } from 'react-router-dom';
import { NotificationBlock } from '../../organisms/NotificationBlock';
import { HelmetMetaData } from '../../organisms/HelmetMetaData';

export const Layout = () => {
  return (
    <>
      <HelmetMetaData />
      <main className="App">
        <NotificationBlock />

        <Outlet />
      </main>
    </>
  );
};
