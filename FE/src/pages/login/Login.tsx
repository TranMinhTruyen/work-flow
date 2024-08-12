import { memo, useCallback, useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FloatButton from '../../components/button/FloatButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import { useNavigate } from 'react-router-dom';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import TextInput from 'components/form/TextInput';
import CheckBox from 'components/form/CheckboxInput';
import { ILoginForm } from 'model/login/LoginForm';
import { openDialogContainer } from 'components/dialog/DialogContainer';
import { handleSubmitLogin } from './action/loginAction';
import loginStyles from 'assets/styles/login/loginStyles';
import { MessageType } from 'common/provider/ApiProvider';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClickShowPassword = useCallback(() => setIsShowPassword(show => !show), []);

  const { control, reset, trigger, handleSubmit } = useForm<ILoginForm>({
    defaultValues: { isRemember: false },
  });

  useEffect(() => {
    reset();
  }, [reset]);

  // Handle submit login
  const handleLogin = useCallback(
    async (data: ILoginForm) => {
      await trigger();
      await handleSubmitLogin(data);
    },
    [trigger]
  );

  const onInvalid: SubmitErrorHandler<ILoginForm> = useCallback(errors => {
    openDialogContainer({
      type: 'message',
      title: 'Error',
      messageType: MessageType.ERROR,
      message: (
        <>
          {Object.entries(errors).map(([field]) => (
            <Typography sx={{ fontSize: 20 }}>Input required: {field}</Typography>
          ))}
        </>
      ),
      onConfirm: () => {},
    });
  }, []);

  return (
    <form id={'login-form'} onSubmit={handleSubmit(handleLogin, onInvalid)}>
      <Card elevation={5} sx={{ width: 700, maxWidth: 700, maxHeight: 700 }}>
        <CardContent>
          <Stack alignItems={'center'}>
            <Typography variant="h4" sx={loginStyles.textTitle}>
              Login
            </Typography>
          </Stack>
        </CardContent>

        <Divider />

        <CardContent>
          <Stack alignItems={'center'} spacing={3}>
            <Avatar sx={loginStyles.avatar} />

            <TextInput
              name={'username'}
              control={control}
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
              name={'password'}
              control={control}
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
          </Stack>

          <Stack alignItems={'end'} sx={{ paddingRight: 10 }}>
            <CheckBox name={'isRemember'} control={control} label={'Remember me'} />
          </Stack>

          <Stack alignItems={'center'}>
            <Typography sx={{ fontSize: 18 }}>
              If you don't have account, please{' '}
              {<Link onClick={() => navigate('/auth/register')}>register</Link>}
            </Typography>
          </Stack>
        </CardContent>

        <Divider />

        <CardContent>
          <Stack alignItems={'center'}>
            <Stack direction={'row'} alignItems={'center'} spacing={10}>
              <FloatButton
                label={
                  <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                    Login
                  </Typography>
                }
                sx={loginStyles.button}
                form={'login-form'}
                type={'submit'}
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </form>
  );
};

export default memo(Login);
