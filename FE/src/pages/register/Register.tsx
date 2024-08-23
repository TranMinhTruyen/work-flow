import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import loginStyles from 'assets/styles/login/loginStyles';
import { memo, useCallback, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import KeyIcon from '@mui/icons-material/Key';
import FloatButton from 'components/button/FloatButton';
import { IRegisterForm } from 'model/register/registerForm';
import { useForm } from 'react-hook-form';
import TextInput from 'components/form/TextInput';
import { SelectDataType } from 'components/input/SelectInput';
import MultiSelectInput from 'components/form/MultiSelectInput';
import FileInput from 'components/form/FileInput';
import { IMAGE_FILE_TYPE } from 'common/constants/commonConst';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';

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
          sx={loginStyles.header}
          title={
            <Typography variant="h4" sx={loginStyles.textTitle}>
              Register
            </Typography>
          }
        />

        <Divider />

        <CardContent>
          <Stack alignItems={'center'} spacing={3}>
            <TextInput
              control={control}
              name={'username'}
              size={'medium'}
              placeholder={'Username or email'}
              required={true}
              sx={loginStyles.textInput}
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
              size={'medium'}
              placeholder={'Password'}
              required={true}
              type={isShowPassword ? 'text' : 'password'}
              sx={loginStyles.textInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position={'start'}>
                    <KeyIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position={'start'}>
                    <IconButton onClick={handleClickShowPassword} edge={'end'}>
                      {isShowPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <MultiSelectInput
              control={control}
              name={'authorities'}
              placeholder={'Authorities'}
              data={selectValue}
              width={500}
            />

            <FileInput
              name={'image'}
              control={control}
              acceptFile={IMAGE_FILE_TYPE}
              label={'Upload image'}
            />
          </Stack>
        </CardContent>

        <Divider />

        <CardActions sx={loginStyles.footer}>
          <FloatButton
            label={
              <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                Register
              </Typography>
            }
            sx={loginStyles.button}
            form={'register-form'}
            type={'submit'}
          />
        </CardActions>
      </Card>
    </form>
  );
};
export default memo(Register);
