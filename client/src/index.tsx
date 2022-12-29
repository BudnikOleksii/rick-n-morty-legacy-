import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './i18nextConf';
import { Loader } from './components/atoms/Loader';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Suspense fallback={Loader()}>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </Suspense>
);
