import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { memo, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { screenUrl } from '@/common/constants/urlConst';
import { MessageType } from '@/common/enums/messageEnum';
import useRouter from '@/common/hooks/useRouter';
import useWebSocket from '@/common/hooks/useWebSocket';
import {
  selectIsLogin,
  selectLoginData,
  selectOpenDrawer,
  selectScreenMaster,
  updateScreenStatus,
} from '@/common/store/commonSlice';
import { handleGetUserProfile } from '@/common/utils/authUtil';
import Drawer from '@/components/drawer/Drawer';
import MainHeader from '@/components/header/main-header/MainHeader';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import ISaveScreenResponse from '@/pages/main-page/settings/screen/model/response/SaveScreenResponse';

import { openDialogContainer } from '../dialog/DialogContainer';

const DRAWER_WIDTH: number = 200;

const MainLayout = () => {
  const { navigate, currentPath } = useRouter();

  const openDrawer = useAppSelector(selectOpenDrawer);
  const dispatch = useAppDispatch();
  const screenMasterList = useAppSelector(selectScreenMaster);
  const loginData = useAppSelector(selectLoginData);
  const isLogin = useAppSelector(selectIsLogin);

  // Check status screen via websocket.
  useWebSocket<ISaveScreenResponse>({
    receiveUrl: '/screen-master/change',
    onSubscribe: async data => {
      if (data) {
        dispatch(
          updateScreenStatus({
            screenId: data.screenId,
            active: data.active,
          })
        );
      }
    },
  });

  // Check screen authority via websocket.
  useWebSocket({
    receiveUrl: `/user/${loginData?.userId}/screen-master/authority`,
    onSubscribe: () => {
      handleGetUserProfile();
    },
  });

  // Check screen is active to render.
  useEffect(() => {
    const screen = screenMasterList?.find(screen => screen.screenUrl === currentPath);

    if (screen && !screen.active) {
      openDialogContainer({
        type: 'message',
        maxWidth: 'sm',
        messageType: MessageType.WARN,
        isPopup: false,
        showCloseButton: false,
        autoClose: true,
        timeout: 15,
        onConfirm: () => {
          navigate(screenUrl.HOME.path, true);
        },
        bodyElement: `${screen.screenName} is deactive!`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenMasterList]);

  return (
    <ScreenLayout open={openDrawer}>
      <MainHeader drawerWidth={DRAWER_WIDTH} />
      {isLogin ? <Drawer key={'drawer'} drawerWidth={DRAWER_WIDTH} /> : null}
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

const ScreenLayout = styled(Grid)<ScreenLayoutProps>(({ theme, open }) => ({
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
