import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined';
import { ReactNode } from 'react';

import { screenUrl } from '@/common/constants/urlConst';

// TODO add screen component

export type IScreenItem = {
  screenKey: string;
  screenParentKey: string | null;
  screenIcon: ReactNode;
  screenLabel: string;
  screenPath: string;
  screenRole: string[] | null;
  screenLevel: number;
  screenChild: IScreenItem[] | null;
};

const screenItemList: IScreenItem[] = [
  {
    screenKey: 'SCR00002',
    screenParentKey: null,
    screenIcon: <HomeOutlinedIcon />,
    screenLabel: 'drawerTitle.home',
    screenPath: screenUrl.HOME.path,
    screenRole: ['ADMIN', 'USER'],
    screenLevel: 1,
    screenChild: null,
  },
  {
    screenKey: 'SCR00003',
    screenParentKey: null,
    screenIcon: <ViewKanbanOutlinedIcon />,
    screenLabel: 'drawerTitle.kanban',
    screenPath: screenUrl.KANBAN.path,
    screenRole: ['ADMIN', 'USER'],
    screenLevel: 1,
    screenChild: null,
  },
  {
    screenKey: 'SCREEN_MASTER',
    screenParentKey: null,
    screenIcon: <DashboardIcon />,
    screenLabel: 'drawerTitle.generalSettings',
    screenPath: '',
    screenRole: ['ADMIN'],
    screenLevel: 3,
    screenChild: [
      {
        screenKey: 'SCR00000',
        screenParentKey: 'SCREEN_MASTER',
        screenIcon: <ListAltIcon />,
        screenLabel: 'drawerTitle.screenSetting',
        screenPath: screenUrl.SCREEN_MASTER.path,
        screenRole: ['ADMIN'],
        screenLevel: 1,
        screenChild: null,
      },
      {
        screenKey: 'SCR00001',
        screenParentKey: 'SCREEN_MASTER',
        screenIcon: <AccountCircleIcon />,
        screenLabel: 'drawerTitle.userSetting',
        screenPath: screenUrl.USER_MASTER.path,
        screenRole: ['ADMIN'],
        screenLevel: 1,
        screenChild: null,
      },
    ],
  },
];
export default screenItemList;
