import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { memo, useCallback, useLayoutEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import KeyIcon from '@mui/icons-material/Key';
import FloatButton from 'components/button/FloatButton';
import { IRegisterForm } from 'model/register/registerForm';
import { useForm } from 'react-hook-form';
import TextInput from 'components/form/TextInput';
import MultiSelectInput from 'components/form/MultiSelectInput';
import FileInput from 'components/form/FileInput';
import { IMAGE_FILE_TYPE } from 'common/constants/commonConst';
import CardActions from '@mui/material/CardActions';
import registerStyles from 'assets/styles/registerStyles';
import { useNavigate } from 'react-router-dom';
import { SelectDataType } from 'common/constants/type';
import { useTranslation } from 'react-i18next';
import DatePickerInput from 'components/form/DatePickerInput';
import EmailIcon from '@mui/icons-material/Email';
import { useAuthHeader } from 'common/contexts/AuthHeaderContext';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export const selectValue: SelectDataType[] = [
  {
    key: 'CREATE',
    value: 'Allow CREATE permission',
  },
  {
    key: 'GET',
    value: 'Allow GET permission',
  },
  {
    key: 'UPDATE',
    value: 'Allow UPDATE permission',
  },
  {
    key: 'DELETE',
    value: 'Allow DELETE permission',
  },
];

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

const Register = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = useCallback(() => setIsShowPassword(show => !show), []);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setHeaderTitle, setHeaderContent } = useAuthHeader();

  useLayoutEffect(() => {
    // Set title for header
    setHeaderTitle(t('Register'));

    // Set button back for header
    setHeaderContent(
      <IconButton
        onClick={() => navigate('/auth/login')}
        sx={{ width: '50px', height: '50px' }}
        color={'primary'}
      >
        <ChevronLeftIcon fontSize={'large'} />
      </IconButton>
    );

    // Remove when unmount
    return () => {
      setHeaderTitle(null);
      setHeaderContent(null);
    };
  }, [navigate, setHeaderContent, setHeaderTitle, t]);

  const { control, reset, trigger, handleSubmit } = useForm<IRegisterForm>({
    defaultValues: {
      authorities: [],
    },
  });

  const handleRegister = useCallback(async (data: IRegisterForm) => {
    console.log(data);
  }, []);

  return (
    <form id={'register-form'} onSubmit={handleSubmit(handleRegister)}>
      <CardContent>
        <Stack alignItems={'center'} spacing={3}>
          <TextInput
            control={control}
            name={'username'}
            label={t('Username')}
            required
            sx={registerStyles.textInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position={'start'}>
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextInput
            control={control}
            name={'password'}
            label={t('Password')}
            required
            type={isShowPassword ? 'text' : 'password'}
            sx={registerStyles.textInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position={'start'}>
                  <KeyIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position={'end'}>
                  <IconButton onClick={handleClickShowPassword} edge={'end'}>
                    {isShowPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextInput
            control={control}
            name={'email'}
            label={t('Email')}
            type={'email'}
            sx={registerStyles.textInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position={'start'}>
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextInput
            control={control}
            name={'fullName'}
            label={t('Full name')}
            sx={registerStyles.textInput}
          />

          <DatePickerInput
            control={control}
            required
            name={'birthday'}
            label={t('Birthday')}
            width={500}
          />

          <MultiSelectInput
            control={control}
            required
            name={'authorities'}
            label={t('Authorities')}
            data={selectValue}
            width={500}
          />

          <FileInput
            control={control}
            name={'image'}
            label={t('Upload image')}
            acceptFile={IMAGE_FILE_TYPE}
            width={500}
          />
        </Stack>
      </CardContent>

      <Divider />

      <CardActions sx={registerStyles.footer}>
        <Stack direction={'row'} spacing={5}>
          <FloatButton
            label={
              <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                {t('Register')}
              </Typography>
            }
            sx={registerStyles.button}
            form={'register-form'}
            type={'submit'}
          />
        </Stack>
      </CardActions>
    </form>
  );
};
export default memo(Register);
