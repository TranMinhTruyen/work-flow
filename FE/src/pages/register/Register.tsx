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
import { issueTypeSelect } from 'pages/kanban-board/data/boardData';
import { SelectDataType } from 'components/input/SelectInput';
import MultiSelectInput from 'components/form/MultiSelectInput';
import FileInput from 'components/form/FileInput';

export const selectValue: SelectDataType[] = [
  {
    key: 0,
    value: 'Error',
  },
  {
    key: 1,
    value: 'Info',
  },
  {
    key: 2,
    value: 'Warning',
  },
];

const Register = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = useCallback(() => setIsShowPassword(show => !show), []);

  const { control, reset, trigger, handleSubmit } = useForm<IRegisterForm>({});

  const handleRegister = useCallback(async (data: IRegisterForm) => {
    console.log(data);
  }, []);

  return (
    <form id={'register-form'} onSubmit={handleSubmit(handleRegister)}>
      <Card elevation={5} sx={{ width: 700, maxWidth: 700, maxHeight: 700 }}>
        <CardContent>
          <Stack alignItems={'center'}>
            <Typography variant="h4" sx={loginStyles.textTitle}>
              Register
            </Typography>
          </Stack>
        </CardContent>

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
              data={issueTypeSelect}
              width={500}
            />

            <FileInput name={'image'} control={control} label={'Upload image'} />
          </Stack>
        </CardContent>

        <Divider />

        <CardContent>
          <Stack alignItems={'center'}>
            <Stack direction={'row'} alignItems={'center'} spacing={10}>
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
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </form>
  );
};
export default memo(Register);
