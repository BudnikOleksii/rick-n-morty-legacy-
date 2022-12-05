import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import NotFoundPage from './pages/NotFound';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Home from './pages/Home';
import { PATHS } from './constants';
import { PrivateRoute } from './components/PrivateRoute';
import Cards from './pages/Cards';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*Public routes*/}
        <Route path={PATHS.registration} element={<Registration />} />
        <Route path={PATHS.login} element={<Login />} />

        {/*Private routes*/}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />}>
            <Route path={PATHS.cards} element={<Cards />} />
          </Route>
        </Route>

        {/*Not found route*/}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
