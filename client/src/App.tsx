import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layouts/Layout';
import NotFoundPage from './pages/NotFound';
import Registration from './pages/Registration';
import Login from './pages/Login';
import { MainLayout } from './components/layouts/MainLayout';
import { PATHS } from './constants';
import { PrivateRoute } from './components/layouts/PrivateRoute';
import Home from './pages/Home';
import Users from './pages/Users';
import Sets from './pages/Sets';
import Characters from './pages/Characters';
import Lots from './pages/Lots';
import Transactions from './pages/Transactions';
import Cards from './pages/Cards';
import Chats from './pages/Chats';
import Chat from './pages/Chat';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path={PATHS.registration} element={<Registration />} />
        <Route path={PATHS.login} element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path={PATHS.cards} element={<Cards />} />
            <Route path={PATHS.users} element={<Users />} />
            <Route path={PATHS.sets} element={<Sets />} />
            <Route path={PATHS.characters} element={<Characters />} />
            <Route path={PATHS.lots} element={<Lots />} />
            <Route path={PATHS.transactions} element={<Transactions />} />
            <Route path={PATHS.chats}>
              <Route index element={<Chats />} />
              <Route path=":id" element={<Chat />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
