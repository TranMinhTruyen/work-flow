'use client';
import { HOME_URL, REGISTER_URL } from '@/common/constants/urlConst';
import { useAuthHeader } from '@/common/contexts/AuthHeaderContext';
import { I18nEnum } from '@/common/enums/I18nEnum';
import useNavigate from '@/common/hooks/useNavigate';
import { IPromiseModalHandle } from '@/common/hooks/usePromiseModal';
import Button from '@/components/button/Button';
import CheckBox from '@/components/form/CheckboxInput';
import TextInput from '@/components/form/TextInput';
import DemoModal, { Item } from '@/components/modal/DemoModal';
import { ILoginForm } from '@/model/login/LoginForm';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { handleSubmitLogin } from './action';

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const { t } = useTranslation(I18nEnum.LOGIN_I18N);
  const { setHeaderTitle } = useAuthHeader();
  const { navigate } = useNavigate();

  const modalRef = useRef<IPromiseModalHandle<Item>>(null);

  const { control, reset, trigger, handleSubmit } = useForm<ILoginForm>({
    defaultValues: { isRemember: false },
  });

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Set title for header
    setHeaderTitle(t('title'));

    // Remove when unmount
    return () => {
      setHeaderTitle(null);
    };
  }, [setHeaderTitle, t]);

  const handleClickShowPassword = useCallback(() => setIsShowPassword(show => !show), []);

  // Handle submit login
  const handleLogin = useCallback(
    async (data: ILoginForm) => {
      await trigger();
      const result = await handleSubmitLogin(data);
      if (result) {
        navigate(HOME_URL, true);
      }
    },
    [navigate, trigger]
  );

  const handleOpenModal = useCallback(async () => {
    if (modalRef.current) {
      const result = await modalRef.current.open();
    }
  }, []);

  return (
    <Box component={'form'} id={'login-form'} onSubmit={handleSubmit(handleLogin)}>
      <CardContent>
        <Stack alignItems={'center'} spacing={3}>
          <Avatar sx={loginStyles.avatar} />
          <TextInput
            name={'userName'}
            control={control}
            i18n={I18nEnum.LOGIN_I18N}
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
            i18n={I18nEnum.LOGIN_I18N}
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
          <CheckBox name={'isRemember'} control={control} label={t('label.remember')} />
        </Stack>

        <Stack alignItems={'center'}>
          <Typography sx={{ fontSize: 18 }}>
            {t('label.noAcccount')}
            {
              <Link onClick={() => navigate(REGISTER_URL)} sx={{ cursor: 'pointer' }}>
                {t('label.register')}
              </Link>
            }
          </Typography>
        </Stack>
      </CardContent>

      <Divider />

      <CardActions sx={loginStyles.footer}>
        <Button
          label={
            <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
              {t('button.login')}
            </Typography>
          }
          sx={loginStyles.button}
          form={'login-form'}
          type={'submit'}
        />

        <Button
          label={
            <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
              {'Test open modal'}
            </Typography>
          }
          onClick={handleOpenModal}
          sx={loginStyles.button}
        />
      </CardActions>

      <DemoModal ref={modalRef} />
    </Box>
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
    width: 200,
    maxWidth: 200,
    height: 40,
    maxHeight: 40,
    backgroundColor: 'rgba(0, 170, 255, 0.8)',
  },

  footer: {
    display: 'flex',
    justifyContent: 'center',
    height: 70,
  },
};

export default memo(Login);
