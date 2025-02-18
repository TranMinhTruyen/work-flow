'use client';
import {
  HOME_URL,
  KANBAN_URL,
  KANBAN_URL_V2,
  SCREEN_MASTER,
  USER_MASTER,
} from '@/common/constants/urlConst';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined';
import { ReactNode } from 'react';

export type DrawerItem = {
  screenKey: string;
  screenIcon: ReactNode;
  screenLabel: string;
  screenPath: string;
  screenRole: string[] | null;
  screenLevel: number;
  screenChild: DrawerItem[] | null;
};

const DrawerItemList: DrawerItem[] = [
  {
    screenKey: '0',
    screenIcon: <HomeOutlinedIcon />,
    screenLabel: 'Home page',
    screenPath: HOME_URL,
    screenRole: ['ADMIN', 'USER'],
    screenLevel: 1,
    screenChild: null,
  },
  {
    screenKey: '1',
    screenIcon: <ViewKanbanOutlinedIcon />,
    screenLabel: 'Kanban page',
    screenPath: KANBAN_URL,
    screenRole: ['ADMIN', 'USER'],
    screenLevel: 1,
    screenChild: null,
  },
  {
    screenKey: '2',
    screenIcon: <ViewKanbanOutlinedIcon />,
    screenLabel: 'Kanban page v2',
    screenPath: KANBAN_URL_V2,
    screenRole: ['ADMIN', 'USER'],
    screenLevel: 1,
    screenChild: null,
  },
  {
    screenKey: '3',
    screenIcon: <ListAltIcon />,
    screenLabel: 'Issue page',
    screenPath: '',
    screenRole: ['ADMIN', 'USER'],
    screenLevel: 1,
    screenChild: null,
  },
  {
    screenKey: '4',
    screenIcon: <DashboardIcon />,
    screenLabel: 'Master page',
    screenPath: '',
    screenRole: ['ADMIN'],
    screenLevel: 3,
    screenChild: [
      {
        screenKey: '4.1',
        screenIcon: <ListAltIcon />,
        screenLabel: 'Screen master',
        screenPath: SCREEN_MASTER,
        screenRole: ['ADMIN'],
        screenLevel: 3,
        screenChild: null,
      },
      {
        screenKey: '4.2',
        screenIcon: <ListAltIcon />,
        screenLabel: 'User master',
        screenPath: USER_MASTER,
        screenRole: ['ADMIN'],
        screenLevel: 3,
        screenChild: null,
      },
    ],
  },
];
export default DrawerItemList;
