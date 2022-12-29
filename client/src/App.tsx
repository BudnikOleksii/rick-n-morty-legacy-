import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layouts/Layout';
import NotFoundPage from './pages/NotFound';
import Registration from './pages/Registration';
import Login from './pages/Login';
import { MainLayout } from './components/layouts/MainLayout';
import { PATHS } from './constants';
import { PrivateRoute } from './components/layouts/PrivateRoute';
import UserCards from './pages/UserCards';
import Users from './pages/Users';
import Sets from './pages/Sets';
import Set from './pages/Set';
import Characters from './pages/Characters';
import Lots from './pages/Lots';
import Payments from './pages/Payments';
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
            <Route index element={<UserCards />} />
            <Route path={PATHS.cards} element={<Cards />} />
            <Route path={PATHS.users}>
              <Route index element={<Users />} />
              <Route path=":id/cards" element={<UserCards />} />
            </Route>
            <Route path={PATHS.sets}>
              <Route index element={<Sets />} />
              <Route path=":id" element={<Set />} />
            </Route>
            <Route path={PATHS.characters} element={<Characters />} />
            <Route path={PATHS.lots} element={<Lots />} />
            <Route path={PATHS.transactions} element={<Payments />} />
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
