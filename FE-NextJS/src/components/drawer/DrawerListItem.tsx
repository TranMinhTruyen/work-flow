'use client';
import { HOME_URL, KANBAN_URL } from '@/common/constants/urlConst';
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
    screenIcon: <ListAltIcon />,
    screenLabel: 'Issue page',
    screenPath: '',
    screenRole: ['ADMIN', 'USER'],
    screenLevel: 1,
    screenChild: null,
  },
  {
    screenKey: '3',
    screenIcon: <DashboardIcon />,
    screenLabel: 'Master page',
    screenPath: '',
    screenRole: ['ADMIN'],
    screenLevel: 1,
    screenChild: [
      {
        screenKey: '3.1',
        screenIcon: <ListAltIcon />,
        screenLabel: 'Role',
        screenPath: '',
        screenRole: null,
        screenLevel: 1,
        screenChild: null,
      },
      {
        screenKey: '3.2',
        screenIcon: <ListAltIcon />,
        screenLabel: 'TEST 1',
        screenPath: '',
        screenRole: null,
        screenLevel: 1,
        screenChild: null,
      },
      {
        screenKey: '3.3',
        screenIcon: <ListAltIcon />,
        screenLabel: 'TEST 2',
        screenPath: '',
        screenRole: null,
        screenLevel: 1,
        screenChild: null,
      },
    ],
  },
];
export default DrawerItemList;
