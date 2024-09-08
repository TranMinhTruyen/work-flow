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
    componentLabel: 'Home',
    componentPath: '/',
    componentRole: null,
    componentChild: null,
  },
  {
    componentKey: '1',
    componentIcon: <ViewKanbanOutlinedIcon />,
    componentLabel: 'Board',
    componentPath: '/board',
    componentRole: null,
    componentChild: null,
  },
  {
    componentKey: '2',
    componentIcon: <ListAltIcon />,
    componentLabel: 'Issue',
    componentPath: '/issue',
    componentRole: null,
    componentChild: null,
  },
  {
    componentKey: '3',
    componentIcon: <DashboardIcon />,
    componentLabel: 'Master',
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
    ],
  },
];
export default DrawerItemList;
