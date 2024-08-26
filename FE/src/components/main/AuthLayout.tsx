import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
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
    (event: SelectChangeEvent<any>) => {
      dispatch(setLanguage(event.target.value));
    },
    [dispatch]
  );

  return (
    <Box>
      <Container sx={authStyles.rootContainer}>
        <Stack spacing={2} sx={{ alignItems: 'flex-end' }}>
          <SelectInput
            width={150}
            data={languageTypeSelect}
            defaultValue={language}
            label={t('Language')}
            onChange={handleChangeLanguage}
          />
          <Outlet />
        </Stack>
      </Container>
    </Box>
  );
};
export default AuthLayout;
