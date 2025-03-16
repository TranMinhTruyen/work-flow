import { Visibility, VisibilityOff } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import Avatar from '@mui/material/Avatar';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { screenUrl } from '@/common/constants/urlConst';
import { I18nEnum } from '@/common/enums/i18nEnum';
import useForm from '@/common/hooks/useForm';
import useRouter from '@/common/hooks/useRouter';
import Button from '@/components/button/Button';
import CheckBoxInput from '@/components/form/CheckBoxInput';
import TextInput from '@/components/form/TextInput';

import { handleSubmitLogin } from './action/action';
import ILoginForm from './model/loginForm';

const LoginPage = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const { t } = useTranslation(I18nEnum.LOGIN_I18N);
  const { navigate } = useRouter();

  const { control, reset, trigger, handleSubmit } = useForm<ILoginForm>({
    context: { language: I18nEnum.LOGIN_I18N },
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
        navigate(screenUrl.LOGIN.path, true);
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
            required
            sx={loginStyles.textInput}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position={'start'}>
                    <AccountCircleIcon fontSize={'small'} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextInput
            name={'password'}
            control={control}
            required
            type={isShowPassword ? 'text' : 'password'}
            sx={loginStyles.textInput}
            autoComplete={'new-password'}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position={'start'}>
                    <KeyIcon fontSize={'small'} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position={'end'}>
                    <IconButton onClick={handleClickShowPassword} edge={'end'}>
                      {isShowPassword ? (
                        <VisibilityOff fontSize={'small'} />
                      ) : (
                        <Visibility fontSize={'small'} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Stack>

        <Stack alignItems={'end'} sx={loginStyles.checkBox}>
          <CheckBoxInput name={'isRemember'} control={control} />
        </Stack>

        <Stack alignItems={'center'}>
          <Typography sx={{ fontSize: 18 }}>
            {t('label.noAcccount')}
            {
              <Link onClick={() => navigate(screenUrl.REGISTER.path)} sx={{ cursor: 'pointer' }}>
                {t('label.register')}
              </Link>
            }
          </Typography>
        </Stack>
      </CardContent>

      <Divider />

      <CardActions sx={loginStyles.footer}>
        <Button
          width={120}
          label={<Typography sx={loginStyles.buttonLabel}>{t('button.login')}</Typography>}
          sx={loginStyles.button}
          form={'login-form'}
          type={'submit'}
        />
      </CardActions>
    </form>
  );
};

const loginStyles = {
  avatar: {
    width: 150,
    maxWidth: 150,
    height: 150,
    maxHeight: 150,
    backgroundColor: 'rgba(0, 170, 255, 0.8)',
  },

  textInput: {
    width: 400,
    maxWidth: 400,
  },

  checkBox: {
    marginRight: '125px',
  },

  button: {
    backgroundColor: 'rgba(0, 170, 255, 0.8)',
  },

  buttonLabel: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  footer: {
    display: 'flex',
    justifyContent: 'center',
    height: 70,
  },
};

export default memo(LoginPage);
