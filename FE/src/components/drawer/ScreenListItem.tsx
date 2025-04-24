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
  screenChild: IScreenItem[] | null;
};

const screenItemList: IScreenItem[] = [
  {
    screenKey: 'SCR00002',
    screenParentKey: null,
    screenIcon: <HomeOutlinedIcon />,
    screenLabel: 'drawerTitle.home',
    screenPath: screenUrl.HOME.path,
    screenChild: null,
  },
  {
    screenKey: 'SCR00003',
    screenParentKey: null,
    screenIcon: <ViewKanbanOutlinedIcon />,
    screenLabel: 'drawerTitle.kanban',
    screenPath: screenUrl.KANBAN.path,
    screenChild: null,
  },
  {
    screenKey: 'SCR00000-PARENT',
    screenParentKey: null,
    screenIcon: <DashboardIcon />,
    screenLabel: 'drawerTitle.generalSettings',
    screenPath: '',
    screenChild: [
      {
        screenKey: 'SCR00000',
        screenParentKey: 'SCREEN_MASTER',
        screenIcon: <ListAltIcon />,
        screenLabel: 'drawerTitle.screenSetting',
        screenPath: screenUrl.SCREEN_MASTER.path,
        screenChild: null,
      },
      {
        screenKey: 'SCR00001',
        screenParentKey: 'SCREEN_MASTER',
        screenIcon: <AccountCircleIcon />,
        screenLabel: 'drawerTitle.userSetting',
        screenPath: screenUrl.USER_MASTER.path,
        screenChild: null,
      },
    ],
  },
];
export default screenItemList;
