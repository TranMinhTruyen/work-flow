'use client';

import MainProvider from '@/common/provider/MainProvider';
import { selectOpenDrawer } from '@/common/store/commonSlice';
import Drawer from '@/components/drawer/Drawer';
import MainHeader from '@/components/header/main-header/MainHeader';
import { useAppSelector } from '@/lib/store';
import { styled } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { ReactNode } from 'react';

const DRAWER_WIDTH: number = 200;

const MainLayout = ({ children }: { children: ReactNode }) => {
  const openDrawer = useAppSelector(selectOpenDrawer);

  return (
    <MainProvider>
      <ScreenLayout open={openDrawer}>
        <MainHeader drawerWidth={DRAWER_WIDTH} />
        <Drawer key={'drawer'} drawerWidth={DRAWER_WIDTH} />
        {children}
      </ScreenLayout>
    </MainProvider>
  );
};

export default MainLayout;

type ScreenLayoutProps = {
  open: boolean;
};

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
