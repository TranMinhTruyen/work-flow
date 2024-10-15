'use client';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { IconButton as MuiIconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { memo, useCallback, useEffect } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from '../../common/store';
import { selectOpenDrawer, toggleDrawer } from '../../common/commonSlice';
import IconButton from '../button/IconButton';
import '../../assets/css/MainHeader.css';
import { useRouter } from 'next/navigation';

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
  const opendrawer = useAppSelector(selectOpenDrawer);
  const router = useRouter();

  // const [notifications, setNotifications] = useState<Map<string, any>>(new Map());
  // const [notificationsSize, setNotificationsSize] = useState<number>();

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

  return (
    <AppBar drawerWidth={drawerWidth} open={opendrawer}>
      <Toolbar id={'toolBar'}>
        <MuiIconButton
          color="inherit"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            width: '40px',
            height: '40px',
            marginRight: 4,
            marginLeft: '-17px',
            ...(opendrawer && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </MuiIconButton>

        <Typography
          variant="h5"
          component="span"
          sx={{
            flexGrow: 1,
            cursor: 'pointer',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
          onClick={() => router.push('/main/home')}
        >
          WORK FLOW
        </Typography>

        <Stack direction={'row'} spacing={2} sx={{ alignItems: 'center' }}>
          <IconButton icon={<NotificationsIcon />} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default memo(MainHeader);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open' && prop !== 'drawerWidth',
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
  backgroundColor: 'rgba(0, 200, 255)',
  height: 50,
  position: 'fixed',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    marginLeft: `${drawerWidth}px`,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
