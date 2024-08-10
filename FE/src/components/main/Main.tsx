import { styled } from '@mui/material';
import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from 'common/store';
import Grid2 from '@mui/material/Unstable_Grid2';
import { selectOpenDrawer } from 'common/commonSlice';
import Drawer from 'components/drawer/Drawer';
import Header from 'components/header/Header';

const DRAWER_WIDTH: number = 250;

const Main = () => {
  const openDrawer = useAppSelector(selectOpenDrawer);

  return (
    <Grid2>
      <Header drawerWidth={DRAWER_WIDTH} />
      <Drawer key={'drawer'} drawerWidth={DRAWER_WIDTH} />
      <ScreenLayout openDrawer={openDrawer}>
        <Outlet />
      </ScreenLayout>
    </Grid2>
  );
};

export default memo(Main);

interface ScreenLayoutProps {
  openDrawer: boolean;
}

const ScreenLayout = styled(Grid2, {
  shouldForwardProp: prop => prop !== 'openDrawer',
})<ScreenLayoutProps>(({ theme, openDrawer }) => ({
  zIndex: theme.zIndex.drawer + 1,
  marginTop: 75,
  paddingLeft: 10,
  paddingRight: 10,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(openDrawer && {
    marginLeft: DRAWER_WIDTH,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!openDrawer && {
    marginLeft: `calc(${theme.spacing(8)} + 6px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
