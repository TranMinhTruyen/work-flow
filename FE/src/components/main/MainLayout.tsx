import { styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from 'common/store';
import { selectOpenDrawer } from 'common/commonSlice';
import Drawer from 'components/drawer/Drawer';
import MainHeader from 'components/header/MainHeader';
import Grid2 from '@mui/material/Grid2';

const DRAWER_WIDTH: number = 250;

const MainLayout = () => {
  const openDrawer = useAppSelector(selectOpenDrawer);

  return (
    <Grid2>
      <MainHeader drawerWidth={DRAWER_WIDTH} />
      <Drawer key={'drawer'} drawerWidth={DRAWER_WIDTH} />
      <ScreenLayout open={openDrawer}>
        <Outlet />
      </ScreenLayout>
    </Grid2>
  );
};

export default MainLayout;

interface ScreenLayoutProps {
  open: boolean;
}

const ScreenLayout = styled(Grid2)<ScreenLayoutProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  marginTop: 75,
  paddingLeft: 10,
  paddingRight: 10,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    marginLeft: `calc(${theme.spacing(8)} + 6px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
