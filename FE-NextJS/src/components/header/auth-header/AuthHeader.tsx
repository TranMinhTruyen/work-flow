'use client';
import { languageConst } from '@/common/constants/commonConst';
import { useAuthHeader } from '@/common/contexts/AuthHeaderContext';
import { I18nEnum } from '@/common/enums/I18nEnum';
import { toSelectData } from '@/common/utils/convertUtil';
import SelectInput from '@/components/inputs/SelectInput';
import { selectLanguage, setLanguage } from '@/lib/slices/commonSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const AuthHeader = () => {
  const { headerContent, headerTitle } = useAuthHeader();
  const { t } = useTranslation(I18nEnum.COMMON_I18N);

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
          defaultValue={language}
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
