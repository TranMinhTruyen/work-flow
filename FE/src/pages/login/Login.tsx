import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FloatButton from '../../components/button/FloatButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import { useNavigate } from 'react-router-dom';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import TextInput from 'components/form/TextInput';
import CheckBox from 'components/form/CheckboxInput';
import { ILoginForm } from 'model/login/LoginForm';
import { openDialogContainer } from 'components/dialog/DialogContainer';
import { handleSubmitLogin } from './action/loginAction';
import loginStyles from 'assets/styles/login/loginStyles';
import { MessageType } from 'common/provider/ApiProvider';

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClickShowPassword = useCallback(() => setIsShowPassword(show => !show), []);

  const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }, []);

  const { control, reset, trigger, handleSubmit } = useForm<ILoginForm>({
    defaultValues: { isRemember: false },
  });

  useEffect(() => {
    reset();
  }, [reset]);

  // Handle submit login
  const handleLogin: SubmitHandler<ILoginForm> = useCallback(
    async (data: ILoginForm) => {
      await trigger();
      await handleSubmitLogin(data);
    },
    [trigger]
  );

  const onInvalid: SubmitErrorHandler<ILoginForm> = useCallback(errors => {
    openDialogContainer({
      type: 'confirm',
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
    <Box>
      <Container sx={loginStyles.rootContainer}>
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
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge={'end'}
                        >
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
                  {
                    <Link href="#" onClick={() => navigate('/board')}>
                      register
                    </Link>
                  }
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
      </Container>
    </Box>
  );
};

export default memo(Login);
