import { ReactNode, Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Flip, ToastContainer } from 'react-toastify';

import routerItemList from './common/constants/routerItemList';
import { AUTH_PREFIX, MAIN_PREFIX, screenUrl } from './common/constants/urlConst';
import RightDrawerContext from './common/context/RightDrawerContext';
import AuthProvider from './common/provider/AuthProvider';
import MainProvider from './common/provider/MainProvider';
import RootProvider from './common/provider/RootProvider';
import { selectLanguage } from './common/store/commonSlice';
import DialogContainer from './components/dialog/DialogContainer';
import LoadingDialog from './components/dialog/LoadingDialog';
import RightDrawer from './components/drawer/RightDrawer';
import ErrorFallback from './components/error/ErrorFallback';
import AuthLayout from './components/layouts/AuthLayout';
import MainLayout from './components/layouts/MainLayout';
import BackButtonListener from './components/loading/BackButtonListener ';
import BackdropLoading from './components/loading/BackdropLoading';
import i18n from './i18n';
import { useAppSelector } from './lib/store';

import './App.css';

const BackgroundLoading = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<BackdropLoading open={true} />}>{children}</Suspense>;
};

const App = () => {
  const language = useAppSelector(selectLanguage);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <ErrorBoundary
          fallbackRender={props => <ErrorFallback {...props} />}
          onReset={() => {
            window.location.replace(screenUrl.HOME.path);
          }}
        >
          <RightDrawerContext>
            <RootProvider>
              <Routes>
                <Route index element={<Navigate to={screenUrl.LOGIN.path} replace />} />
                <Route
                  path={'/'}
                  element={
                    <BackgroundLoading>
                      <AuthProvider>
                        <AuthLayout />
                      </AuthProvider>
                    </BackgroundLoading>
                  }
                >
                  {routerItemList
                    .filter(item => item.screenPrefix === AUTH_PREFIX)
                    .map((item, index) => (
                      <Route
                        key={index}
                        path={item.screenPath}
                        element={<BackgroundLoading>{item.screen}</BackgroundLoading>}
                      />
                    ))}
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
                  {routerItemList
                    .filter(item => item.screenPrefix === MAIN_PREFIX)
                    .map((item, index) => (
                      <Route
                        key={index}
                        index={item.screenPath === screenUrl.HOME.path ? true : false}
                        path={item.screenPath}
                        element={<BackgroundLoading>{item.screen}</BackgroundLoading>}
                      />
                    ))}
                </Route>
              </Routes>
            </RootProvider>
            <RightDrawer />
          </RightDrawerContext>
          <DialogContainer />
          <LoadingDialog />
          <BackButtonListener />
          <ToastContainer
            autoClose={5000}
            hideProgressBar
            position={'top-center'}
            limit={5}
            newestOnTop
            closeOnClick
            theme={'colored'}
            transition={Flip}
          />
        </ErrorBoundary>
      </BrowserRouter>
    </I18nextProvider>
  );
};

export default App;
