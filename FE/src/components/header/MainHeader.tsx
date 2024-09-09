import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { IconButton as MuiIconButton } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../common/store';
import FloatButton from '../button/FloatButton';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountButton from './AccountButton';
import IconButton from '../button/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { selectOpenDrawer, toggleDrawer } from 'common/commonSlice';
import Stack from '@mui/material/Stack';
import { RESET_ALL } from 'common/constants/commonConst';

type IHeaderProps = {
  drawerWidth: number;
};

type AppBarProps = MuiAppBarProps & {
  drawerWidth?: number;
  open?: boolean;
};

const MainHeader = (props: IHeaderProps) => {
  const { drawerWidth } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const opendrawer = useAppSelector(selectOpenDrawer);
  const theme = useTheme();

  const [notifications, setNotifications] = useState<Map<string, any>>(new Map());
  const [notificationsSize, setNotificationsSize] = useState<number>();

  // TODO Websocket example
  // useEffect(() => {
  //   const socket = new SockJS('http://localhost:8080/ws');
  //   const stompClient = new Client({
  //     webSocketFactory: () => socket as any,
  //     onConnect: () => {
  //       console.log('WebSocket connection opened');

  //       stompClient.subscribe('/user/00001/check-notification', msg => {
  //         const newNotification = JSON.parse(msg.body);
  //         setNotifications(prevNotifications => {
  //           const newNotifications = new Map(prevNotifications);
  //           newNotifications.set(newNotification.id, newNotification.message);
  //           return newNotifications;
  //         });
  //       });
  //     },
  //   });
  //   stompClient.activate();

  //   return () => {
  //     stompClient.deactivate();
  //     setNotifications(new Map<string, any>());
  //     console.log('WebSocket connection closed');
  //   };
  // }, []);

  useEffect(() => {
    // console.log('Notification state: ', notifications);
    // setNotificationsSize(notifications?.size);
  }, []);

  const handleDrawerOpen = useCallback(() => {
    dispatch(toggleDrawer());
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    navigate('/auth/login', { replace: true });
    dispatch({ type: RESET_ALL });
    localStorage.removeItem('login');
    sessionStorage.removeItem('login');
  }, [dispatch, navigate]);

  return (
    <AppBar drawerWidth={drawerWidth} position="fixed" open={opendrawer}>
      <Toolbar>
        <MuiIconButton
          color="inherit"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            width: `calc(${theme.spacing(5)} + 6px)`,
            marginRight: 4,
            marginLeft: '-13px',
            ...(opendrawer && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </MuiIconButton>
        <Typography
          variant="h5"
          component="span"
          sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase' }}
          onClick={() => navigate('/board')}
        >
          WORK FLOW
        </Typography>
        <Stack direction={'row'} spacing={2}>
          <FloatButton startIcon={<LogoutIcon />} label="Logout" onClick={handleLogout} />

          <AccountButton />

          <IconButton icon={<NotificationsIcon />} badgeContent={notificationsSize} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
export default memo(MainHeader);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open' && prop !== 'drawerWidth',
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
