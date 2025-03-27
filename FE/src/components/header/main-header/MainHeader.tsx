import { SvgIcon } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import logoUrl from '@/assets/logo.svg';
import { languageConst } from '@/common/constants/commonConst';
import { screenUrl } from '@/common/constants/urlConst';
import { I18nEnum } from '@/common/enums/i18nEnum';
import useRouter from '@/common/hooks/useRouter';
import { selectLanguage, setLanguage } from '@/common/store/commonSlice';
import { toSelectData } from '@/common/utils/convertUtil';
import SelectInput from '@/components/inputs/SelectInput';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import NotificationPopover from './NotificationPopover';
import UserPopover from './UserPopover';

type HeaderProps = {
  drawerWidth: number;
};

type AppBarProps = MuiAppBarProps & {
  drawerwidth?: number;
};

const MainHeader = (props: HeaderProps) => {
  const { drawerWidth } = props;
  const { t } = useTranslation(I18nEnum.COMMON_I18N);
  const { navigate } = useRouter();

  const dispatch = useAppDispatch();
  const language: string = useAppSelector(selectLanguage);

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

  return (
    <AppBar elevation={0} drawerwidth={drawerWidth}>
      <Stack direction={'row'} sx={{ minHeight: '55px !important' }}>
        <Stack direction={'row'} sx={{ alignItems: 'center', mr: 'auto' }} spacing={1.5}>
          <Stack
            direction={'row'}
            sx={{ alignItems: 'center', justifyContent: 'center', width: '57px', height: '57px' }}
          >
            <SvgIcon
              viewBox={'0 0 100 100'}
              sx={{ height: '35px !important', width: '35px !important', borderRadius: '15px' }}
              onClick={() => navigate(screenUrl.HOME.path)}
            >
              <image href={logoUrl} viewBox={'0 0 100 100'} />
            </SvgIcon>
          </Stack>

          <Typography
            variant={'h5'}
            component={'span'}
            sx={styles.title}
            onClick={() => navigate(screenUrl.HOME.path)}
          >
            WORK FLOW
          </Typography>
        </Stack>

        <Stack
          direction={'row'}
          spacing={1.5}
          sx={{ alignItems: 'center', ml: 'auto', paddingRight: 1.5 }}
        >
          <LanguageSelect
            id={'language'}
            width={150}
            data={toSelectData(languageData, { key: 'id', value: 'label' })}
            value={language}
            label={t('label.language')}
            onChange={handleChangeLanguage}
          />

          <NotificationPopover />

          <UserPopover />
        </Stack>
      </Stack>
    </AppBar>
  );
};

export default MainHeader;

const styles = {
  title: {
    cursor: 'pointer',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
};

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  height: '55px',
  width: '100%',
  position: 'fixed',
  zIndex: theme.zIndex.drawer + 1,
}));

const LanguageSelect = styled(SelectInput)({
  '& .MuiInputBase-formControl': {
    height: '40px',
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

  '& #selectLanguage': {
    '& .MuiBox-root': {
      display: 'inline-block',
    },
  },
});
