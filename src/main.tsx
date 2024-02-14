import ReactDOM from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import { Suspense, lazy } from 'react';
import App from './App.tsx';
import './index.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthForm, Loader, NavigationHandler } from './components/index.ts';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { PATHS, ToogleAuth } from './enums';
const Notify = lazy(() => import('./components/UI/Notify.tsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.tsx'));
const NewPin = lazy(() => import('./pages/NewPin.tsx'));
const Community = lazy(() => import('./pages/Community.tsx'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Loader />
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={<Loader show={true} />}>
        <BrowserRouter>
          <NextUIProvider className="md:p-8 lg:p-0 h-full grid">
            <Notify />
            <NavigationHandler />
            <Routes>
              <Route path={PATHS.LOGIN} element={<AuthForm type={ToogleAuth.LOGIN} />}></Route>
              <Route
                path={PATHS.REGISTER}
                element={<AuthForm type={ToogleAuth.REGISTER} />}
              ></Route>
              <Route path={PATHS.HOME} element={<App />}>
                <Route index element={<Dashboard />} />
                <Route path={PATHS.NEW_POST} element={<NewPin />} />
                <Route path={PATHS.USERS_POST} element={<Community />} />
              </Route>
            </Routes>
          </NextUIProvider>
        </BrowserRouter>
      </Suspense>
    </PersistGate>
  </Provider>,
);
