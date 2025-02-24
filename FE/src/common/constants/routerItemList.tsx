import { lazy, ReactNode } from 'react';
import { screenUrl } from './urlConst';

const LoginPage = lazy(() => import('@/pages/auth-page/login/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth-page/register/RegisterPage'));

export interface IRouterItem {
  screen: ReactNode;
  screenPrefix: string;
  screenPath: string;
}

const routerItemList: Array<IRouterItem> = [
  {
    screen: <LoginPage />,
    screenPrefix: screenUrl['LOGIN'].prefix,
    screenPath: screenUrl['LOGIN'].path,
  },
  {
    screen: <RegisterPage />,
    screenPrefix: screenUrl['REGISTER'].prefix,
    screenPath: screenUrl['REGISTER'].path,
  },
  {
    screen: null,
    screenPrefix: screenUrl['HOME'].prefix,
    screenPath: screenUrl['HOME'].path,
  },
  {
    screen: null,
    screenPrefix: screenUrl['KANBAN'].prefix,
    screenPath: screenUrl['KANBAN'].path,
  },
  {
    screen: null,
    screenPrefix: screenUrl['KANBAN_V2'].prefix,
    screenPath: screenUrl['KANBAN_V2'].path,
  },
  {
    screen: null,
    screenPrefix: screenUrl['SCREEN_MASTER'].prefix,
    screenPath: screenUrl['SCREEN_MASTER'].path,
  },
  {
    screen: null,
    screenPrefix: screenUrl['USER_MASTER'].prefix,
    screenPath: screenUrl['USER_MASTER'].path,
  },
];

export default routerItemList;
