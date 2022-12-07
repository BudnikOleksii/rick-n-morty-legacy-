import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthLayout } from './components/layouts/AuthLayout';
import NotFoundPage from './pages/NotFound';
import Registration from './pages/Registration';
import Login from './pages/Login';
import { MainLayout } from './components/layouts/MainLayout';
import { PATHS } from './constants';
import { PrivateRoute } from './components/layouts/PrivateRoute';
import Cards from './pages/Cards';
import Users from './pages/Users';
import Sets from './pages/Sets';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path={PATHS.registration} element={<Registration />} />
        <Route path={PATHS.login} element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Cards />} />
            <Route path={PATHS.users} element={<Users />} />
            <Route path={PATHS.sets} element={<Sets />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
