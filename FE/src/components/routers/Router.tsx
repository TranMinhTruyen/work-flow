import { lazy, ReactNode, Suspense, useEffect } from 'react';
import RouterItems from './RouterItems';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';
import { ApiProvider } from 'common/provider/ApiProvider';
import AuthProvider from 'common/provider/AuthProvider';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from 'components/layouts/AuthLayout';
import { checkLogin } from 'common/utils/authUtil';

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
  const navigate = useNavigate();

  // useEffect(() => {
  //   const isLogin = checkLogin();
  //   const savedPath = sessionStorage.getItem('currentPath');

  //   if (!isLogin) {
  //     navigate('/auth/login', { replace: true });
  //     if (savedPath) {
  //       navigate(savedPath);
  //     }
  //     return;
  //   } else {
  //     if (savedPath && !savedPath.includes('/auth')) {
  //       navigate(savedPath, { replace: true });
  //       return;
  //     } else {
  //       navigate('/', { replace: true });
  //       return;
  //     }
  //   }
  // }, [navigate]);

  return (
    <ApiProvider>
      <Routes>
        <Route
          path={'/auth'}
          element={
            <BackgroundLoading>
              <AuthLayout />
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
              <AuthProvider>
                <MainLayout />
              </AuthProvider>
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
  );
};

export default Router;
