'use client';
import { ReactElement } from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';

export interface DrawerItem {
  componentKey: string;
  componentIcon: ReactElement;
  componentLabel: string;
  componentPath: string;
  componentRole: Array<string> | null;
  componentChild: Array<DrawerItem> | null;
}

const DrawerItemList: Array<DrawerItem> = [
  {
    componentKey: '0',
    componentIcon: <HomeOutlinedIcon />,
    componentLabel: 'Home page',
    componentPath: '/',
    componentRole: null,
    componentChild: null,
  },
  {
    componentKey: '1',
    componentIcon: <ViewKanbanOutlinedIcon />,
    componentLabel: 'Kanban page',
    componentPath: '/kanban',
    componentRole: null,
    componentChild: null,
  },
  {
    componentKey: '2',
    componentIcon: <ListAltIcon />,
    componentLabel: 'Issue page',
    componentPath: '/issue',
    componentRole: null,
    componentChild: null,
  },
  {
    componentKey: '3',
    componentIcon: <DashboardIcon />,
    componentLabel: 'Master page',
    componentPath: '/master',
    componentRole: null,
    componentChild: [
      {
        componentKey: '3.1',
        componentIcon: <ListAltIcon />,
        componentLabel: 'Role',
        componentPath: '/master-role',
        componentRole: null,
        componentChild: null,
      },
      {
        componentKey: '3.2',
        componentIcon: <ListAltIcon />,
        componentLabel: 'TEST 1',
        componentPath: '/master-role-test1',
        componentRole: null,
        componentChild: null,
      },
      {
        componentKey: '3.3',
        componentIcon: <ListAltIcon />,
        componentLabel: 'TEST 2',
        componentPath: '/master-role-test2',
        componentRole: null,
        componentChild: null,
      },
    ],
  },
];
export default DrawerItemList;
