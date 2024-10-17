'use client';
import Grid2 from '@mui/material/Grid2';
import { memo, ReactNode, Suspense } from 'react';
import { styled } from '@mui/material';
import { useAppSelector } from '@/common/store';
import { selectOpenDrawer } from '@/common/commonSlice';
import MainProvider from '@/common/provider/MainProvider';
import MainHeader from '@/components/header/MainHeader';
import Drawer from '@/components/drawer/Drawer';

const DRAWER_WIDTH: number = 200;

const MainLayout = ({ children }: { children: ReactNode }) => {
  const openDrawer = useAppSelector(selectOpenDrawer);

  return (
    <MainProvider>
      <Grid2>
        <MainHeader drawerWidth={DRAWER_WIDTH} />
        <Drawer key={'drawer'} drawerWidth={DRAWER_WIDTH} />
        <ScreenLayout open={openDrawer}>
          <Suspense>{children}</Suspense>
        </ScreenLayout>
      </Grid2>
    </MainProvider>
  );
};

export default memo(MainLayout);

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
