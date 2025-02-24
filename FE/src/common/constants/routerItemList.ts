import { ReactNode } from 'react';
import { screenUrl } from './urlConst';

export interface IRouterItem {
  screen: ReactNode | null;
  screenPrefix: string;
  screenPath: string;
}

const routerItemList: IRouterItem[] = [
  {
    screen: null,
    screenPrefix: screenUrl['LOGIN'].prefix,
    screenPath: screenUrl['LOGIN'].path,
  },
  {
    screen: null,
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
