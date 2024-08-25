import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import authStyles from 'assets/styles/main/AuthLayout';
import { SelectDataType } from 'common/constants/type';
import SelectInput from 'components/input/SelectInput';
import { useCallback } from 'react';
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
  const { i18n } = useTranslation();

  const handleChangeLanguage = useCallback(
    (event: SelectChangeEvent<any>) => {
      i18n.changeLanguage(event.target.value === '' ? 'EN' : event.target.value);
    },
    [i18n]
  );

  return (
    <Box>
      <Container sx={authStyles.rootContainer}>
        <Stack spacing={2} sx={{ alignItems: 'flex-end' }}>
          <SelectInput
            width={150}
            data={languageTypeSelect}
            defaultValue={'EN'}
            label={'Language'}
            onChange={handleChangeLanguage}
          />
          <Outlet />
        </Stack>
      </Container>
    </Box>
  );
};
export default AuthLayout;
