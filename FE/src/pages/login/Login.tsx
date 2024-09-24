import { memo, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import { useNavigate } from 'react-router-dom';
import TextInput from 'components/form/TextInput';
import CheckBox from 'components/form/CheckboxInput';
import { handleSubmitLogin } from './action/loginAction';
import loginStyles from 'assets/styles/loginStyles';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import CardActions from '@mui/material/CardActions';
import { useTranslation } from 'react-i18next';
import FloatButton from 'components/button/FloatButton';
import { useForm } from 'react-hook-form';
import { useAuthHeader } from 'common/contexts/AuthHeaderContext';
import { ILoginForm } from 'model/login/loginForm';
import { translate } from 'common/utils/i18nUtil';
import { I18nEnum } from 'common/enums/i18nEnum';

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setHeaderTitle } = useAuthHeader();

  useLayoutEffect(() => {
    // Set title for header

    setHeaderTitle(t(translate('title', I18nEnum.LOGIN_I18N)));

    // Remove when unmount
    return () => {
      setHeaderTitle(null);
    };
  }, [setHeaderTitle, t]);

  const { control, reset, trigger, handleSubmit } = useForm<ILoginForm>({
    defaultValues: { isRemember: false },
  });

  useEffect(() => {
    reset();
  }, [reset]);

  const handleClickShowPassword = useCallback(() => setIsShowPassword(show => !show), []);

  // Handle submit login
  const handleLogin = useCallback(
    async (data: ILoginForm) => {
      await trigger();
      const result = await handleSubmitLogin(data);
      if (result) {
        navigate('/', { replace: true });
      }
    },
    [navigate, trigger]
  );

  return (
    <form id={'login-form'} onSubmit={handleSubmit(handleLogin)}>
      <CardContent>
        <Stack alignItems={'center'} spacing={3}>
          <Avatar sx={loginStyles.avatar} />

          <TextInput
            name={'userName'}
            control={control}
            label={t(translate('label.username', I18nEnum.LOGIN_I18N))}
            required
            sx={loginStyles.textInput}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position={'start'}>
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextInput
            name={'password'}
            control={control}
            label={t(translate('label.password', I18nEnum.LOGIN_I18N))}
            required
            type={isShowPassword ? 'text' : 'password'}
            sx={loginStyles.textInput}
            slotProps={{
              input: {
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
              },
            }}
          />
        </Stack>

        <Stack alignItems={'end'} sx={{ paddingRight: 10 }}>
          <CheckBox
            name={'isRemember'}
            control={control}
            label={t(translate('label.remember', I18nEnum.LOGIN_I18N))}
          />
        </Stack>

        <Stack alignItems={'center'}>
          <Typography sx={{ fontSize: 18 }}>
            {t(translate('label.noAcccount', I18nEnum.LOGIN_I18N))}
            {
              <Link onClick={() => navigate('/auth/register')}>
                {t(translate('label.register', I18nEnum.LOGIN_I18N))}
              </Link>
            }
          </Typography>
        </Stack>
      </CardContent>

      <Divider />

      <CardActions sx={loginStyles.footer}>
        <FloatButton
          label={
            <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
              {t(translate('button.login', I18nEnum.LOGIN_I18N))}
            </Typography>
          }
          sx={loginStyles.button}
          form={'login-form'}
          type={'submit'}
        />
      </CardActions>
    </form>
  );
};

export default memo(Login);
