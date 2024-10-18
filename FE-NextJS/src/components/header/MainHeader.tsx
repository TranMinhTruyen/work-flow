'use client';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { IconButton as MuiIconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Stack from '@mui/material/Stack';
import IconButton from '../button/IconButton';
import { useAppDispatch, useAppSelector } from '@/common/store';
import { selectLanguage, selectOpenDrawer, setLanguage, toggleDrawer } from '@/common/commonSlice';
import './main-header.css';
import SelectInput from '../inputs/SelectInput';
import { toSelectData } from '@/common/utils/convertUtil';
import { useTranslation } from 'react-i18next';
import { I18nEnum } from '@/common/enums/i18nEnum';
import { languageConst } from '@/common/constants/commonConst';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import useNavigate from '@/common/hooks/useNavigate';

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
  const { t, i18n } = useTranslation(I18nEnum.COMMON_I18N);
  const language: string = useAppSelector(selectLanguage);
  const [hoverOpenDrawer, setHoverOpenDrawer] = useState<boolean>(false);
  const { navigate } = useNavigate();

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
        label: t(item.id),
      })),
    [t]
  );

  const openDrawerButton = useMemo(
    () => (hoverOpenDrawer ? <KeyboardArrowRightIcon fontSize={'large'} /> : <MenuIcon />),
    [hoverOpenDrawer]
  );

  return (
    <AppBar drawerWidth={drawerWidth} open={opendrawer}>
      <Toolbar id={'toolBar'}>
        <MuiIconButton
          color={'inherit'}
          onClick={handleDrawerOpen}
          edge={'start'}
          sx={{
            ...styles.openDrawer,
            ...(opendrawer && { display: 'none' }),
          }}
          onMouseEnter={() => setHoverOpenDrawer(true)}
          onMouseLeave={() => setHoverOpenDrawer(false)}
        >
          {openDrawerButton}
        </MuiIconButton>

        <Stack direction={'row'} sx={{ flexGrow: 1 }}>
          <Typography
            variant={'h5'}
            component={'span'}
            sx={styles.title}
            onClick={() => navigate('/home')}
          >
            WORK FLOW
          </Typography>
        </Stack>

        <Stack direction={'row'} spacing={2} sx={{ alignItems: 'center' }}>
          <SelectInput
            id={'language'}
            width={150}
            data={toSelectData(languageData, { key: 'id', value: 'label' })}
            defaultValue={language}
            label={t('label.language')}
            onChange={handleChangeLanguage}
            sx={styles.selectInput}
          />

          <IconButton icon={<NotificationsIcon fontSize={'small'} />} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default memo(MainHeader);

const styles = {
  openDrawer: {
    width: '40px',
    height: '40px',
    marginRight: 4,
    marginLeft: '-17px',
  },

  title: {
    cursor: 'pointer',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  selectInput: {
    '& .MuiInputBase-formControl': {
      height: '40px !important',
    },

    '& .MuiChip-root': {
      height: '20px',
    },

    '& .MuiSelect-select': {
      marginTop: '-3px',
    },

    '& .MuiOutlinedInput-input': {
      color: 'rgba(255, 255, 255, 255) !important',
    },

    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 255)',
      '&.Mui-focused': {
        color: 'rgba(255, 255, 255, 255)',
      },
    },

    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 255)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(0, 0, 0)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgba(0, 0, 0)',
      },
    },
  },
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open' && prop !== 'drawerWidth',
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
  height: '50px',
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
