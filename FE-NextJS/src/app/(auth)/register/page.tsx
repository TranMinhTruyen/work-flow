'use client';

import { IRegisterForm } from '@/app/(auth)/register/model/RegisterForm';
import { authorities, role } from '@/common/constants/commonConst';
import { LOGIN_URL } from '@/common/constants/urlConst';
import { I18nEnum } from '@/common/enums/I18nEnum';
import { MessageType } from '@/common/enums/MessageEnum';
import useNavigate from '@/common/hooks/useNavigate';
import useScreenComponent from '@/common/hooks/useScreenComponent';
import { selectProxyType } from '@/common/store/commonSlice';
import Button from '@/components/button/Button';
import { openDialogContainer } from '@/components/dialog/DialogContainer';
import DatePickerInput from '@/components/form/DatePickerInput';
import ImageInput from '@/components/form/ImageInput';
import MultiSelectInput from '@/components/form/MultiSelectInput';
import SelectInput from '@/components/form/SelectInput';
import TextInput from '@/components/form/TextInput';
import { useAppSelector } from '@/lib/store';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { handleSubmitRegister } from './service/action';

const Register = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = useCallback(() => setIsShowPassword(show => !show), []);
  const { t } = useTranslation(I18nEnum.REGISTER_I18N);
  const { createByCondition } = useScreenComponent();
  const proxyType = useAppSelector(selectProxyType);

  const { navigate } = useNavigate();
  const classes = registerStyles();

  const { control, trigger, handleSubmit, reset } = useForm<IRegisterForm>();

  useEffect(() => {
    reset();
  }, [reset]);

  const handleRegister = useCallback(
    async (formData: IRegisterForm) => {
      await trigger();
      const response = await handleSubmitRegister(formData);
      if (response) {
        openDialogContainer({
          type: 'message',
          messageType: MessageType.SUCCESS,
          message: `Create username: ${response.userName} success`,
          onConfirm: () => {
            navigate(LOGIN_URL);
          },
        });
      } else {
        reset();
      }
    },
    [navigate, reset, trigger]
  );

  const authorizerComponent = useMemo(() => {
    return createByCondition(
      () => {
        return proxyType && proxyType === 'SYSTEM' ? true : false;
      },
      <>
        <SelectInput
          name={'role'}
          control={control}
          required
          displayNone
          i18n={I18nEnum.REGISTER_I18N}
          data={role}
          width={400}
        />

        <MultiSelectInput
          name={'authorities'}
          control={control}
          required
          i18n={I18nEnum.REGISTER_I18N}
          data={authorities}
          width={400}
        />
      </>
    );
  }, [control, createByCondition, proxyType]);

  return (
    <form id={'register-form'} onSubmit={handleSubmit(handleRegister)}>
      <CardContent>
        <Stack alignItems={'center'} spacing={3}>
          <ImageInput name={'image'} control={control} />

          <TextInput
            name={'userName'}
            control={control}
            i18n={I18nEnum.REGISTER_I18N}
            required
            className={classes.textInput}
            slotProps={{
              htmlInput: {
                maxLength: 10,
              },
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
            i18n={I18nEnum.REGISTER_I18N}
            required
            type={isShowPassword ? 'text' : 'password'}
            className={classes.textInput}
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
            autoComplete={'new-password'}
          />

          <TextInput
            name={'email'}
            control={control}
            i18n={I18nEnum.REGISTER_I18N}
            type={'email'}
            className={classes.textInput}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position={'start'}>
                    <EmailIcon />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextInput
            name={'fullName'}
            control={control}
            i18n={I18nEnum.REGISTER_I18N}
            className={classes.textInput}
          />

          <DatePickerInput
            name={'birthDay'}
            control={control}
            i18n={I18nEnum.REGISTER_I18N}
            width={400}
          />

          {authorizerComponent}
        </Stack>
      </CardContent>

      <Divider />

      <CardActions className={classes.footer}>
        <Stack direction={'row'} spacing={5}>
          <Button
            label={<Typography className={classes.buttonLabel}>{t('button.register')}</Typography>}
            className={classes.button}
            form={'register-form'}
            type={'submit'}
          />
        </Stack>
      </CardActions>
    </form>
  );
};

const registerStyles = makeStyles({
  textInput: {
    width: 400,
    maxWidth: 400,
  },

  button: {
    width: 150,
    maxWidth: 200,
    height: 40,
    maxHeight: 40,
    backgroundColor: 'rgba(0, 170, 255, 0.8) !important',
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
});

export default memo(Register);
