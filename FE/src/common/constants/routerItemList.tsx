import { lazy, ReactNode } from 'react';

import { screenUrl } from './urlConst';

const LoginPage = lazy(() => import('@/pages/auth-page/login/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth-page/register/RegisterPage'));
const HomePage = lazy(() => import('@/pages/main-page/home/HomePage'));
const KanbanPage = lazy(() => import('@/pages/main-page/kanban/KanbanPage'));
const ScreenPage = lazy(() => import('@/pages/main-page/settings/screen/ScreenPage'));
const UserPage = lazy(() => import('@/pages/main-page/settings/user/UserPage'));

export interface IRouterItem {
  screen: ReactNode;
  screenPrefix: string;
  screenPath: string;
}

const routerItemList: Array<IRouterItem> = [
  {
    screen: <LoginPage />,
    screenPrefix: screenUrl.LOGIN.prefix,
    screenPath: screenUrl.LOGIN.path,
  },
  {
    screen: <RegisterPage />,
    screenPrefix: screenUrl.REGISTER.prefix,
    screenPath: screenUrl.REGISTER.path,
  },
  {
    screen: <HomePage />,
    screenPrefix: screenUrl.HOME.prefix,
    screenPath: screenUrl.HOME.path,
  },
  {
    screen: <KanbanPage />,
    screenPrefix: screenUrl.KANBAN.prefix,
    screenPath: screenUrl.KANBAN.path,
  },
  {
    screen: <ScreenPage />,
    screenPrefix: screenUrl.SCREEN_MASTER.prefix,
    screenPath: screenUrl.SCREEN_MASTER.path,
  },
  {
    screen: <UserPage />,
    screenPrefix: screenUrl.USER_MASTER.prefix,
    screenPath: screenUrl.USER_MASTER.path,
  },
];

export default routerItemList;
