'use client';
import Grid2 from '@mui/material/Grid2';
import { memo, ReactNode } from 'react';
import { styled } from '@mui/material';
import { useAppSelector } from '@/lib/store';
import { selectOpenDrawer } from '@/lib/slices/commonSlice';
import MainProvider from '@/common/provider/MainProvider';
import Drawer from '@/components/drawer/Drawer';
import MainHeader from '@/components/header/main-header/MainHeader';

const DRAWER_WIDTH: number = 200;

const MainLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const openDrawer = useAppSelector(selectOpenDrawer);

  return (
    <MainProvider>
      <Grid2>
        <MainHeader drawerWidth={DRAWER_WIDTH} />
        <Drawer key={'drawer'} drawerWidth={DRAWER_WIDTH} />
        <ScreenLayout open={openDrawer}>{children}</ScreenLayout>
      </Grid2>
    </MainProvider>
  );
};

export default memo(MainLayout);

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
