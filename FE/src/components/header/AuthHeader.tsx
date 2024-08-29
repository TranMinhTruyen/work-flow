import Stack from '@mui/material/Stack';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { selectLanguage, setLanguage } from 'common/commonSlice';
import { SelectDataType } from 'common/constants/type';
import { useAuthHeader } from 'common/contexts/AuthHeaderContext';
import { useAppDispatch, useAppSelector } from 'common/store';
import SelectInput from 'components/input/SelectInput';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const languageTypeSelect: SelectDataType[] = [
  {
    key: 'EN',
    value: 'English',
  },
  {
    key: 'VI',
    value: 'Việt Nam',
  },
  {
    key: 'JP',
    value: 'Japan',
  },
];

const AuthHeader = () => {
  const { headerContent } = useAuthHeader();
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
    <Stack direction={'row'} spacing={2}>
      <Grid2 container spacing={2} alignItems={'center'} justifyContent={'center'}>
        {headerContent}
      </Grid2>
      <Stack direction={'row'} justifyContent={'flex-end'} width={'100%'}>
        <SelectInput
          width={150}
          data={languageTypeSelect}
          defaultValue={language}
          label={t('Language')}
          onChange={handleChangeLanguage}
        />
      </Stack>
    </Stack>
  );
};

export default AuthHeader;
