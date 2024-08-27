import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { memo, useCallback, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import KeyIcon from '@mui/icons-material/Key';
import FloatButton from 'components/button/FloatButton';
import { IRegisterForm } from 'model/register/registerForm';
import { useForm } from 'react-hook-form';
import TextInput from 'components/form/TextInput';
import MultiSelectInput from 'components/form/MultiSelectInput';
import FileInput from 'components/form/FileInput';
import { IMAGE_FILE_TYPE } from 'common/constants/commonConst';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import registerStyles from 'assets/styles/login/registerStyles';
import { useNavigate } from 'react-router-dom';
import { SelectDataType } from 'common/constants/type';
import { useTranslation } from 'react-i18next';
import DatePickerInput from 'components/form/DatePickerInput';
import SelectInput from 'components/form/SelectInput';

export const selectValue: SelectDataType[] = [
  {
    key: 'CREATE',
    value: 'Can CREATE',
  },
  {
    key: 'GET',
    value: 'Can GET',
  },
  {
    key: 'UPDATE',
    value: 'Can UPDATE',
  },
  {
    key: 'DELETE',
    value: 'Can DELETE',
  },
];

const Register = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = useCallback(() => setIsShowPassword(show => !show), []);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      <Card elevation={5} sx={{ width: 700, maxWidth: 700, maxHeight: 800 }}>
        <CardHeader
          sx={registerStyles.header}
          title={
            <Typography variant="h4" align="center" sx={registerStyles.textTitle}>
              {t('Register')}
            </Typography>
          }
        />

        <Divider />

        <CardContent>
          <Stack alignItems={'center'} spacing={3}>
            <TextInput
              control={control}
              name={'username'}
              label={t('Username or email')}
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

            <MultiSelectInput
              control={control}
              required
              name={'authorities'}
              label={t('Authorities')}
              data={selectValue}
              width={500}
              onChange={value => console.log(value)}
            />

            <SelectInput
              control={control}
              displayNone
              required
              name={'test'}
              label={t('Test')}
              data={selectValue}
              width={500}
            />

            <DatePickerInput
              control={control}
              required
              name={'birthday'}
              label={t('Birthday')}
              width={500}
            />

            <FileInput
              control={control}
              name={'image'}
              acceptFile={IMAGE_FILE_TYPE}
              label={t('Upload image')}
              width={500}
            />
          </Stack>
        </CardContent>

        <Divider />

        <CardActions sx={registerStyles.footer}>
          <Stack direction={'row'} spacing={5}>
            <FloatButton
              onClick={() => navigate('/auth/login')}
              label={
                <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {t('Back')}
                </Typography>
              }
              sx={registerStyles.button}
              form={'register-form'}
            />

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
      </Card>
    </form>
  );
};
export default memo(Register);
