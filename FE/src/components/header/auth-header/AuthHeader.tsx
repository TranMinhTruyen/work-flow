import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactNode, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { languageConst } from '@/common/constants/commonConst';
import { screenUrl } from '@/common/constants/urlConst';
import { I18nEnum } from '@/common/enums/i18nEnum';
import useRouter from '@/common/hooks/useRouter';
import { selectLanguage, setLanguage } from '@/common/store/commonSlice';
import { toSelectData } from '@/common/utils/convertUtil';
import SelectInput from '@/components/inputs/SelectInput';
import { useAppDispatch, useAppSelector } from '@/lib/store';

const AuthHeader = () => {
  const { t } = useTranslation(I18nEnum.COMMON_I18N);
  const { navigate, currentPath } = useRouter();

  const dispatch = useAppDispatch();
  const language = useAppSelector(selectLanguage);

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

  const headerContent = useMemo<ReactNode>(() => {
    if (!currentPath) {
      return;
    }
    switch (currentPath) {
      case screenUrl.REGISTER.path:
        return (
          <IconButton onClick={() => navigate(screenUrl.LOGIN.path)} color={'primary'}>
            <ChevronLeftIcon fontSize={'large'} />
          </IconButton>
        );
      default:
        break;
    }
  }, [currentPath, navigate]);

  const headerTitle = useMemo<ReactNode>(() => {
    if (!currentPath) {
      return;
    }
    switch (currentPath) {
      case screenUrl.LOGIN.path:
        return t('screenTitle.login');
      case screenUrl.REGISTER.path:
        return t('screenTitle.register');
      default:
        break;
    }
  }, [currentPath, t]);

  return (
    <Stack direction={'row'} sx={authHeaderStyles.header}>
      <Stack direction={'row'} spacing={2} sx={authHeaderStyles.headerContent}>
        {headerContent}
      </Stack>

      <Stack sx={authHeaderStyles.headerTitle}>
        <Typography variant={'h4'} sx={authHeaderStyles.textTitle}>
          {headerTitle}
        </Typography>
      </Stack>

      <Stack direction={'row'} sx={authHeaderStyles.headerSelect}>
        <SelectInput
          width={150}
          data={toSelectData(languageData, { key: 'id', value: 'label' })}
          value={language}
          label={t('label.language')}
          onChange={handleChangeLanguage}
        />
      </Stack>
    </Stack>
  );
};

const authHeaderStyles = {
  header: {
    height: '70px',
  },

  headerContent: {
    paddingLeft: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },

  headerTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  headerSelect: {
    paddingRight: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },

  textTitle: {
    fontSize: '30px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
};

export default AuthHeader;
