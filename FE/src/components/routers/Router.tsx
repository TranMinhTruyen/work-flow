import { lazy, ReactNode, Suspense } from 'react';
import RouterItems from './RouterItems';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';
import { ApiProvider } from 'common/provider/ApiProvider';
import AuthLayout from 'components/layouts/AuthLayout';
import MainProvider from 'common/provider/MainProvider';
import AuthProvider from 'common/provider/AuthProvider';
import MainLayout from 'components/layouts/MainLayout';

const Login = lazy(() => import('../../pages/login/Login'));
const Register = lazy(() => import('../../pages/register/Register'));

const routerItems = RouterItems;

const BackgroundLoading = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense
      fallback={
        <Backdrop open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      }
    >
      {children}
    </Suspense>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <ApiProvider>
        <Routes>
          <Route
            path={'/auth'}
            element={
              <BackgroundLoading>
                <AuthProvider>
                  <AuthLayout />
                </AuthProvider>
              </BackgroundLoading>
            }
          >
            <Route
              path={'login'}
              element={
                <BackgroundLoading>
                  <Login />
                </BackgroundLoading>
              }
            />
            <Route
              path={'register'}
              element={
                <BackgroundLoading>
                  <Register />
                </BackgroundLoading>
              }
            />
          </Route>

          <Route
            path={'/'}
            element={
              <BackgroundLoading>
                <MainProvider>
                  <MainLayout />
                </MainProvider>
              </BackgroundLoading>
            }
          >
            {routerItems.map((item, index) => (
              <Route
                key={index}
                index={item.componentPath === '/' ? true : false}
                path={item.componentPath}
                element={<BackgroundLoading>{item.componentElement}</BackgroundLoading>}
              />
            ))}
          </Route>
        </Routes>
      </ApiProvider>
    </BrowserRouter>
  );
};

export default Router;
