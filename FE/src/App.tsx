import { ReactNode, Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
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
import AuthLayout from './components/layouts/AuthLayout';
import MainLayout from './components/layouts/MainLayout';
import BackButtonListener from './components/loading/BackButtonListener ';
import BackdropLoading from './components/loading/BackdropLoading';
import i18n from './i18n';
import { useAppSelector } from './lib/store';

const BackgroundLoading = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<BackdropLoading />}>{children}</Suspense>;
};

const App = () => {
  const language = useAppSelector(selectLanguage);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <BrowserRouter>
      <RightDrawerContext>
        <RootProvider>
          <Routes>
            <Route path={'/'} element={<Navigate to={screenUrl.LOGIN.path} replace />} />
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
                    index={item.screenPath === screenUrl.LOGIN.path ? true : false}
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
    </BrowserRouter>
  );
};

export default App;
