import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import authStyles from 'assets/styles/authStyles';
import { selectLanguage, setLanguage } from 'common/commonSlice';
import { languageTypeSelect } from 'common/constants/commonConst';
import { useAuthHeader } from 'common/contexts/AuthHeaderContext';
import { useAppDispatch, useAppSelector } from 'common/store';
import SelectInput from 'components/inputs/SelectInput';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AuthHeader = () => {
  const { headerContent, headerTitle } = useAuthHeader();
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
    <Stack direction={'row'} sx={authStyles.header}>
      <Stack direction={'row'} spacing={2} sx={authStyles.headerContent}>
        {headerContent}
      </Stack>

      <Stack sx={authStyles.headerTitle}>
        <Typography variant={'h4'} sx={authStyles.textTitle}>
          {headerTitle}
        </Typography>
      </Stack>

      <Stack direction={'row'} sx={authStyles.headerSelect}>
        <SelectInput
          width={150}
          data={languageTypeSelect}
          defaultValue={language}
          label={t('Language')}
          onChange={handleChangeLanguage}
          sx={{
            '& .MuiInputBase-formControl': {
              height: '40px !important',
            },
            '& .MuiChip-root': {
              height: '20px',
            },
            '& .MuiSelect-select': {
              marginTop: '-3px',
            },
          }}
        />
      </Stack>
    </Stack>
  );
};

export default AuthHeader;
