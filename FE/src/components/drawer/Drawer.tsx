import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import { DrawerProps } from '@mui/material/Drawer/Drawer';
import { CSSObject, styled, Theme } from '@mui/material/styles';

import { useAppSelector } from '@/lib/store';
import { selectOpenDrawer } from '@/common/store/commonSlice';

import DrawerMenu from './DrawerMenu';

type IDrawerProps = {
  drawerWidth: number;
};

type ICustomDrawerProps = DrawerProps & {
  drawerWidth?: number;
};

const Drawer = (props: IDrawerProps) => {
  const { drawerWidth } = props;
  const openDrawer = useAppSelector(selectOpenDrawer);

  return (
    <CustomDrawer drawerWidth={drawerWidth} variant={'permanent'} open={openDrawer}>
      <DrawerHeader sx={{ minHeight: '55px !important' }}></DrawerHeader>
      <Divider />
      <DrawerMenu />
    </CustomDrawer>
  );
};

const openedMixin = (theme: Theme, drawerWidth: number): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(5)} + 9px)`,
  minWidth: '57px',
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(6)} + 9px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const CustomDrawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open' && prop !== 'drawerWidth',
})<ICustomDrawerProps>(({ theme, open, drawerWidth }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme, drawerWidth !== undefined ? drawerWidth : 250),
    '& .MuiDrawer-paper': openedMixin(theme, drawerWidth !== undefined ? drawerWidth : 250),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default Drawer;
