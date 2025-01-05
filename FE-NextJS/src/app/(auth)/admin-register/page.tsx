'use client';
import { authorities, role } from '@/common/constants/commonConst';
import { LOGIN_URL } from '@/common/constants/urlConst';
import { useAuthHeader } from '@/common/contexts/AuthHeaderContext';
import { I18nEnum } from '@/common/enums/I18nEnum';
import useNavigate from '@/common/hooks/useNavigate';
import Button from '@/components/button/Button';
import DatePickerInput from '@/components/form/DatePickerInput';
import ImageInput from '@/components/form/ImageInput';
import MultiSelectInput from '@/components/form/MultiSelectInput';
import SelectInput from '@/components/form/SelectInput';
import TextInput from '@/components/form/TextInput';
import { selectProxyRole } from '@/lib/slices/commonSlice';
import { useAppSelector } from '@/lib/store';
import { IRegisterForm } from '@/model/register/RegisterForm';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
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

const AdminRegister = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = useCallback(() => setIsShowPassword(show => !show), []);
  const { t } = useTranslation([I18nEnum.REGISTER_I18N, I18nEnum.COMMON_I18N]);
  const { setHeaderTitle, setHeaderContent } = useAuthHeader();
  const { navigate } = useNavigate();
  const proxyRole = useAppSelector(selectProxyRole);
  const classes = registerStyles();

  const backButton = useMemo(
    () => (
      <IconButton
        onClick={() => navigate(LOGIN_URL)}
        className={classes.backButton}
        color={'primary'}
      >
        <ChevronLeftIcon fontSize={'large'} />
      </IconButton>
    ),
    [classes.backButton, navigate]
  );

  useEffect(() => {
    // Set title for header
    setHeaderTitle(t('title'));

    // Set button back for header
    setHeaderContent(backButton);

    // Remove when unmount
    return () => {
      setHeaderTitle(null);
      setHeaderContent(null);
    };
  }, [backButton, setHeaderContent, setHeaderTitle, t]);

  const { control, trigger, handleSubmit, reset } = useForm<IRegisterForm>();

  useEffect(() => {
    // if (proxyRole !== 'ADMIN') {
    //   openDialogContainer({
    //     type: 'message',
    //     messageType: MessageType.WARN,
    //     isPopup: false,
    //     showCloseButton: false,
    //     autoClose: true,
    //     timeout: 15,
    //     message: t(`${I18nEnum.COMMON_I18N}:message.noPermission`),
    //     onConfirm: () => {
    //       navigate(LOGIN_URL, true);
    //     },
    //   });
    // }
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRegister = useCallback(
    async (formData: IRegisterForm) => {
      await trigger();
    },
    [trigger]
  );

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
            required
            width={400}
          />

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
  backButton: {
    width: 50,
    height: 50,
  },

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

export default memo(AdminRegister);
