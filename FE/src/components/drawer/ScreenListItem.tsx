import {
  AUTH_PREFIX,
  HOME_URL,
  KANBAN_URL,
  KANBAN_URL_V2,
  LOGIN_URL,
  MAIN_PREFIX,
  REGISTER_URL,
  SCREEN_MASTER,
  USER_MASTER,
} from '@/common/constants/urlConst';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined';
import { ReactNode } from 'react';

// TODO add screen component

export type IScreenItem = {
  screenKey: string;
  screenIcon: ReactNode;
  screenLabel: string;
  screenPrefix: string;
  screenPath: string;
  screenRole: string[] | null;
  screenLevel: number;
  screenChild: IScreenItem[] | null;
};

const screenItemList: IScreenItem[] = [
  {
    screenKey: '',
    screenIcon: null,
    screenLabel: 'Login page',
    screenPrefix: AUTH_PREFIX,
    screenPath: LOGIN_URL,
    screenRole: [],
    screenLevel: 0,
    screenChild: null,
  },
  {
    screenKey: '',
    screenIcon: null,
    screenLabel: 'Register page',
    screenPrefix: AUTH_PREFIX,
    screenPath: REGISTER_URL,
    screenRole: [],
    screenLevel: 0,
    screenChild: null,
  },
  {
    screenKey: 'SCR00002',
    screenIcon: <HomeOutlinedIcon />,
    screenLabel: 'Home page',
    screenPrefix: MAIN_PREFIX,
    screenPath: HOME_URL,
    screenRole: ['ADMIN', 'USER'],
    screenLevel: 1,
    screenChild: null,
  },
  {
    screenKey: '1',
    screenIcon: <ViewKanbanOutlinedIcon />,
    screenLabel: 'Kanban page',
    screenPrefix: MAIN_PREFIX,
    screenPath: KANBAN_URL,
    screenRole: ['ADMIN', 'USER'],
    screenLevel: 1,
    screenChild: null,
  },
  {
    screenKey: 'SCR00003',
    screenIcon: <ViewKanbanOutlinedIcon />,
    screenLabel: 'Kanban page v2',
    screenPrefix: MAIN_PREFIX,
    screenPath: KANBAN_URL_V2,
    screenRole: ['ADMIN', 'USER'],
    screenLevel: 1,
    screenChild: null,
  },
  {
    screenKey: '3',
    screenIcon: <ListAltIcon />,
    screenLabel: 'Issue page',
    screenPrefix: MAIN_PREFIX,
    screenPath: '',
    screenRole: ['ADMIN', 'USER'],
    screenLevel: 1,
    screenChild: null,
  },
  {
    screenKey: 'SCREEN_MASTER',
    screenIcon: <DashboardIcon />,
    screenLabel: 'Master',
    screenPrefix: '',
    screenPath: '',
    screenRole: ['ADMIN'],
    screenLevel: 3,
    screenChild: [
      {
        screenKey: 'SCR00000',
        screenIcon: <ListAltIcon />,
        screenLabel: 'Screen master',
        screenPrefix: MAIN_PREFIX,
        screenPath: SCREEN_MASTER,
        screenRole: ['ADMIN'],
        screenLevel: 3,
        screenChild: null,
      },
      {
        screenKey: 'SCR00001',
        screenIcon: <AccountCircleIcon />,
        screenLabel: 'User master',
        screenPrefix: MAIN_PREFIX,
        screenPath: USER_MASTER,
        screenRole: ['ADMIN'],
        screenLevel: 3,
        screenChild: null,
      },
    ],
  },
];
export default screenItemList;
