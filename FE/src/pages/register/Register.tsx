import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { memo, useCallback, useLayoutEffect, useMemo, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import KeyIcon from '@mui/icons-material/Key';
import FloatButton from 'components/button/FloatButton';
import { useForm } from 'react-hook-form';
import TextInput from 'components/form/TextInput';
import MultiSelectInput from 'components/form/MultiSelectInput';
import CardActions from '@mui/material/CardActions';
import registerStyles from 'assets/styles/registerStyles';
import { useNavigate } from 'react-router-dom';
import { SelectDataType } from 'common/constants/type';
import { useTranslation } from 'react-i18next';
import DatePickerInput from 'components/form/DatePickerInput';
import EmailIcon from '@mui/icons-material/Email';
import { useAuthHeader } from 'common/contexts/AuthHeaderContext';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SelectInput from 'components/form/SelectInput';
import { handleSubmitRegister } from './action/registerAction';
import { openPopupDialogContainer } from 'components/dialog/PopupDialogContainer';
import { IRegisterForm } from 'model/register/registerForm';
import { I18nEnum } from 'common/enums/i18nEnum';
import ImageInput from 'components/form/ImageInput';
import { MessageType } from 'common/enums/messageEnums';

export const authorities: SelectDataType[] = [
  {
    key: 'CREATE',
    value: 'Allow CREATE permission',
  },
  {
    key: 'GET',
    value: 'Allow GET permission',
  },
  {
    key: 'UPDATE',
    value: 'Allow UPDATE permission',
  },
  {
    key: 'DELETE',
    value: 'Allow DELETE permission',
  },
];

export const role: SelectDataType[] = [
  {
    key: 'ADMIN',
    value: 'Role Administrator',
  },
  {
    key: 'USER',
    value: 'Role User',
  },
];

const Register = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = useCallback(() => setIsShowPassword(show => !show), []);
  const navigate = useNavigate();
  const { t } = useTranslation(I18nEnum.REGISTER_I18N);
  const { setHeaderTitle, setHeaderContent } = useAuthHeader();

  const backButton = useMemo(
    () => (
      <IconButton
        onClick={() => navigate('/auth/login')}
        sx={{ width: '50px', height: '50px' }}
        color={'primary'}
      >
        <ChevronLeftIcon fontSize={'large'} />
      </IconButton>
    ),
    [navigate]
  );

  useLayoutEffect(() => {
    // Set title for header
    setHeaderTitle(t('title'));

    // Set button back for header
    setHeaderContent(backButton);

    // Remove when unmount
    return () => {
      setHeaderTitle(null);
      setHeaderContent(null);
    };
  }, [backButton, navigate, setHeaderContent, setHeaderTitle, t]);

  const { control, trigger, handleSubmit } = useForm<IRegisterForm>();

  const handleRegister = useCallback(
    async (formData: IRegisterForm) => {
      console.log(formData);
      await trigger();
      const response = await handleSubmitRegister(formData);
      if (response !== undefined) {
        openPopupDialogContainer({
          type: 'message',
          title: 'SUCCESS',
          messageType: MessageType.SUCCESS,
          message: `Create username: ${response.userName} success`,
          onConfirm: () => {
            navigate('/auth/login');
          },
        });
      }
    },
    [navigate, trigger]
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
            sx={registerStyles.textInput}
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
            i18n={I18nEnum.REGISTER_I18N}
            required
            type={isShowPassword ? 'text' : 'password'}
            sx={registerStyles.textInput}
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

          <TextInput
            name={'email'}
            control={control}
            i18n={I18nEnum.REGISTER_I18N}
            type={'email'}
            sx={registerStyles.textInput}
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
            sx={registerStyles.textInput}
          />

          <DatePickerInput
            name={'birthDay'}
            control={control}
            i18n={I18nEnum.REGISTER_I18N}
            required
            width={500}
          />

          <SelectInput
            name={'role'}
            control={control}
            required
            displayNone
            i18n={I18nEnum.REGISTER_I18N}
            data={role}
            width={500}
          />

          <MultiSelectInput
            name={'authorities'}
            control={control}
            required
            i18n={I18nEnum.REGISTER_I18N}
            data={authorities}
            width={500}
          />
        </Stack>
      </CardContent>

      <Divider />

      <CardActions sx={registerStyles.footer}>
        <Stack direction={'row'} spacing={5}>
          <FloatButton
            label={
              <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                {t('button.register')}
              </Typography>
            }
            sx={registerStyles.button}
            form={'register-form'}
            type={'submit'}
          />
        </Stack>
      </CardActions>
    </form>
  );
};
export default memo(Register);
