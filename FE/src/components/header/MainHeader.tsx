import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { IconButton as MuiIconButton } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountButton from './AccountButton';
import IconButton from '../button/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { selectLanguage, selectOpenDrawer, setLanguage, toggleDrawer } from 'common/commonSlice';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from 'common/store';
import SelectInput from 'components/inputs/SelectInput';
import { useTranslation } from 'react-i18next';
import { toSelectData } from 'common/utils/convertUtil';
import { languageConst } from 'common/constants/commonConst';
import { translate } from 'common/utils/i18nUtil';
import { I18nEnum } from 'common/enums/i18nEnum';

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
  const { t, i18n } = useTranslation();
  const language: string = useAppSelector(selectLanguage);

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

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

  const handleDrawerOpen = useCallback(() => {
    dispatch(toggleDrawer());
  }, [dispatch]);

  const handleChangeLanguage = useCallback(
    (value: string) => {
      dispatch(setLanguage(value));
    },
    [dispatch]
  );

  const languageData = useMemo(
    () =>
      languageConst.map(item => ({
        id: item.id,
        label: t(translate(item.id, I18nEnum.COMMON_I18N)),
      })),
    [t]
  );

  return (
    <AppBar drawerWidth={drawerWidth} position={'fixed'} open={opendrawer}>
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
          onClick={() => navigate('/kanban')}
        >
          WORK FLOW
        </Typography>

        <Stack direction={'row'} spacing={2} sx={{ alignItems: 'center' }}>
          <SelectInput
            width={150}
            data={toSelectData(languageData, { key: 'id', value: 'label' })}
            defaultValue={language}
            label={t(translate('language', I18nEnum.COMMON_I18N))}
            onChange={handleChangeLanguage}
            sx={{
              '& .MuiInputBase-formControl': {
                height: '40px !important',
              },
              '& .MuiChip-root': {
                height: '20px',
              },
              '& .MuiSelect-select': {
                marginTop: '-1px',
              },
            }}
          />

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
  backgroundColor: 'rgba(0, 200, 255)',
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
