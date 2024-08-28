import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import authStyles from 'assets/styles/main/AuthLayout';
import { selectLanguage, setLanguage } from 'common/commonSlice';
import { SelectDataType } from 'common/constants/type';
import { useAppDispatch, useAppSelector } from 'common/store';
import SelectInput from 'components/input/SelectInput';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

export const languageTypeSelect: SelectDataType[] = [
  {
    key: 'EN',
    value: 'English',
  },
  {
    key: 'VI',
    value: 'Việt Nam',
  },
];

const AuthLayout = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const language: string = useAppSelector(selectLanguage);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

  const handleChangeLanguage = useCallback(
    (value: string) => {
      dispatch(setLanguage(value));
    },
    [dispatch]
  );

  return (
    <Grid2
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
    >
      <Stack spacing={2}>
        <Stack sx={{ alignItems: 'flex-end' }}>
          <SelectInput
            width={150}
            data={languageTypeSelect}
            defaultValue={language}
            label={t('Language')}
            onChange={handleChangeLanguage}
          />
        </Stack>
        <Outlet />
      </Stack>
    </Grid2>
  );
};
export default AuthLayout;
