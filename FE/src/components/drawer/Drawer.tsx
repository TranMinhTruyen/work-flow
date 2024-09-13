import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import { DrawerProps } from '@mui/material/Drawer/Drawer';
import IconButton from '@mui/material/IconButton';
import { memo, useCallback } from 'react';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import DrawerMenu from './DrawerMenu';
import { ChevronLeft } from '@mui/icons-material';
import { selectOpenDrawer, toggleDrawer } from 'common/commonSlice';
import { useAppDispatch, useAppSelector } from 'common/store';

type IDrawerProps = {
  drawerWidth: number;
};

type ICustomDrawerProps = DrawerProps & {
  drawerWidth?: number;
};

const Drawer = (props: IDrawerProps) => {
  const { drawerWidth } = props;
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const openDrawer = useAppSelector(selectOpenDrawer);

  const handleOpenDrawer = useCallback(() => {
    dispatch(toggleDrawer());
  }, [dispatch]);

  return (
    <CustomDrawer theme={theme} drawerWidth={drawerWidth} variant="permanent" open={openDrawer}>
      <DrawerHeader>
        <IconButton onClick={handleOpenDrawer} sx={{ justifyContent: 'center' }}>
          <ChevronLeft fontSize="large" />
        </IconButton>
      </DrawerHeader>
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
  width: `calc(${theme.spacing(7)} + 6px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 6px)`,
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

export default memo(Drawer);
