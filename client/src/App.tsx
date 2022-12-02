import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import NotFound from './pages/NotFound/NotFound';
import Registration from './pages/Registration/Registration';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import { PATHS } from './constants';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*Public routes*/}
        <Route path={PATHS.registration} element={<Registration />} />
        <Route path={PATHS.login} element={<Login />} />

        {/*Private routes*/}
        <Route path="/" element={<Home />} />

        {/*Not found route*/}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
