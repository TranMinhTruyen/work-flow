import { Box, styled } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { memo, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import useWebSocket from '@/common/hooks/useWebSocket';
import {
  selectOpenDrawer,
  selectScreenMaster,
  updateScreenStatus,
} from '@/common/store/commonSlice';
import Drawer from '@/components/drawer/Drawer';
import MainHeader from '@/components/header/main-header/MainHeader';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import ISaveScreenResponse from '@/pages/main-page/settings/screen/model/SaveScreenResponse';

const DRAWER_WIDTH: number = 200;

const MainLayout = () => {
  const openDrawer = useAppSelector(selectOpenDrawer);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const screenMasterList = useAppSelector(selectScreenMaster);
  const { receiveData } = useWebSocket<ISaveScreenResponse>({
    receiveUrl: '/screen-master/change',
  });

  // Check status screen via websocket.
  useEffect(() => {
    if (receiveData) {
      dispatch(
        updateScreenStatus({
          screenId: receiveData.screenId,
          active: receiveData.active,
        })
      );
    }
  }, [dispatch, receiveData]);

  // Check screen is active to render.
  useEffect(() => {
    const screen = screenMasterList?.find(screen => screen.screenUrl === location.pathname);

    if (screen && !screen.active) {
      throw new Error('404');
    }
  }, [location.pathname, screenMasterList]);

  return (
    <ScreenLayout open={openDrawer}>
      <MainHeader drawerWidth={DRAWER_WIDTH} />
      <Drawer key={'drawer'} drawerWidth={DRAWER_WIDTH} />
      <Box sx={{ padding: '10px', flex: 1, overflow: 'auto' }}>
        <Outlet />
      </Box>
    </ScreenLayout>
  );
};

export default memo(MainLayout);

type ScreenLayoutProps = {
  open: boolean;
};

const ScreenLayout = styled(Grid2)<ScreenLayoutProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  marginTop: 55,
  height: 'calc(100vh - 55px)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
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
