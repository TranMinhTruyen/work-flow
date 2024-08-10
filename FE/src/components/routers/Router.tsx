import { lazy, memo, ReactNode, Suspense } from 'react';
import RouterItems from './RouterItems';
import { Route, Routes } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';
import { ApiProvider } from 'common/provider/ApiProvider';
import AuthProvider from 'common/provider/AuthProvider';

const Login = lazy(() => import('../../pages/login/Login'));
const Main = lazy(() => import('../main/Main'));

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
    <ApiProvider>
      <Routes>
        <Route
          path={'/login'}
          element={
            <BackgroundLoading>
              <Login />
            </BackgroundLoading>
          }
        />
        <Route
          path={'/'}
          element={
            <BackgroundLoading>
              <AuthProvider>
                <Main />
              </AuthProvider>
            </BackgroundLoading>
          }
        >
          {routerItems.map((item, index) => (
            <Route
              key={index}
              index={item.componentPath === '/board' ? true : false}
              path={item.componentPath}
              element={<BackgroundLoading>{item.componentElement}</BackgroundLoading>}
            />
          ))}
        </Route>
      </Routes>
    </ApiProvider>
  );
};

export default memo(Router);
