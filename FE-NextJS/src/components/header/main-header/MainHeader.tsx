'use client';
import { languageConst } from '@/common/constants/commonConst';
import { HOME_URL } from '@/common/constants/urlConst';
import { I18nEnum } from '@/common/enums/I18nEnum';
import useNavigate from '@/common/hooks/useNavigate';
import { toSelectData } from '@/common/utils/convertUtil';
import IconButton from '@/components/button/IconButton';
import SelectInput from '@/components/inputs/SelectInput';
import {
  selectLanguage,
  selectOpenDrawer,
  setLanguage,
  toggleDrawer,
} from '@/lib/slices/commonSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton as MuiIconButton } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import UserPopover from './UserPopover';

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
      <Toolbar sx={{ minHeight: '55px !important' }}>
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
            onClick={() => navigate(HOME_URL)}
          >
            WORK FLOW
          </Typography>
        </Stack>

        <Stack direction={'row'} spacing={2} sx={{ alignItems: 'center' }}>
          <LanguageSelect
            id={'language'}
            width={150}
            data={toSelectData(languageData, { key: 'id', value: 'label' })}
            defaultValue={language}
            label={t('label.language')}
            onChange={handleChangeLanguage}
          />

          <IconButton icon={<NotificationsIcon fontSize={'small'} />} />

          <UserPopover />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default MainHeader;

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
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open' && prop !== 'drawerWidth',
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
  height: '55px',
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

const LanguageSelect = styled(SelectInput)({
  '& .MuiInputBase-formControl': {
    height: '40px',
  },

  '& .MuiChip-root': {
    // marginTop: '2px',
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
      borderColor: 'rgba(0, 0, 0, 1)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(0, 0, 0, 1)',
    },
  },
});
