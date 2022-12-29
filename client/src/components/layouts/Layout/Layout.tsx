import React from 'react';
import { Outlet } from 'react-router-dom';
import { NotificationBlock } from '../../organisms/NotificationBlock';
import { HelmetMetaData } from '../../organisms/HelmetMetaData';
import { LanguageSelect } from '../../molecules/LanguageSelect';

export const Layout = () => {
  return (
    <>
      <HelmetMetaData />

      <LanguageSelect />

      <main className="App">
        <NotificationBlock />

        <Outlet />
      </main>
    </>
  );
};
