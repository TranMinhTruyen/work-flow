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
import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { screenUrl } from '@/common/constants/urlConst';
import { I18nEnum } from '@/common/enums/i18nEnum';
import { MessageType } from '@/common/enums/messageEnum';
import useForm from '@/common/hooks/useForm';
import useNavigate from '@/common/hooks/useRouter';
import Button from '@/components/button/Button';
import { openDialogContainer } from '@/components/dialog/DialogContainer';
import DatePickerInput from '@/components/form/DatePickerInput';
import ImageInput from '@/components/form/ImageInput';
import TextInput from '@/components/form/TextInput';

import { handleSubmitRegister } from './action/action';
import IRegisterForm from './model/RegisterForm';

const RegisterPage = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const { t } = useTranslation(I18nEnum.REGISTER_I18N);
  const { navigate } = useNavigate();

  const { control, trigger, handleSubmit, reset } = useForm<IRegisterForm>({
    context: { language: I18nEnum.REGISTER_I18N },
  });

  useEffect(() => {
    reset();
  }, [reset]);

  const handleClickShowPassword = useCallback(() => setIsShowPassword(show => !show), []);

  const handleRegister = useCallback(
    async (formData: IRegisterForm) => {
      await trigger();
      const response = await handleSubmitRegister(formData);
      if (response) {
        openDialogContainer({
          type: 'message',
          messageType: MessageType.SUCCESS,
          bodyElement: `Create username: ${response.userName} success`,
          onConfirm: () => {
            navigate(screenUrl.LOGIN.path);
          },
        });
      } else {
        reset();
      }
    },
    [navigate, reset, trigger]
  );

  return (
    <form id={'register-form'} onSubmit={handleSubmit(handleRegister)}>
      <CardContent>
        <Stack alignItems={'center'} spacing={3}>
          <ImageInput name={'image'} control={control} />

          <TextInput
            name={'userName'}
            control={control}
            required
            sx={registerStyles.textInput}
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
            autoComplete={'new-password'}
          />

          <TextInput
            name={'email'}
            control={control}
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

          <TextInput name={'fullName'} control={control} sx={registerStyles.textInput} />

          <DatePickerInput name={'birthDay'} control={control} width={400} />
        </Stack>
      </CardContent>

      <Divider />

      <CardActions sx={registerStyles.footer}>
        <Stack direction={'row'} spacing={5}>
          <Button
            width={120}
            label={t('button.register')}
            sx={registerStyles.button}
            form={'register-form'}
            type={'submit'}
          />
        </Stack>
      </CardActions>
    </form>
  );
};

const registerStyles = {
  textInput: {
    width: 400,
    maxWidth: 400,
  },

  button: {
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
};

export default memo(RegisterPage);
