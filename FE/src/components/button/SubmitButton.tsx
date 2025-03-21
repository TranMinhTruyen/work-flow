import Typography from '@mui/material/Typography';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { I18nEnum } from '@/common/enums/i18nEnum';
import { MessageType } from '@/common/enums/messageEnum';

import { openDialogContainer } from '../dialog/DialogContainer';
import Button, { ButtonProps } from './Button';

export type SubmitButtonProps = ButtonProps & {
  onSubmit: () => void;
};

const SubmitButton = (props: SubmitButtonProps) => {
  const { onSubmit, ...restProps } = props;

  const { t } = useTranslation(I18nEnum.COMMON_I18N);

  const handleSubmitButton = useCallback(() => {
    openDialogContainer({
      type: 'message',
      maxWidth: 'xs',
      messageType: MessageType.INFO,
      isPopup: false,
      onConfirm: onSubmit,
      showCancelButton: true,
      bodyElement: <Typography>{t('buttonMessage.submit')}</Typography>,
    });
  }, [onSubmit, t]);

  return (
    <Button
      sx={{ marginLeft: 'auto', backgroundColor: 'rgba(0, 170, 255, 0.8)' }}
      label={
        <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
          {t('button.submit')}
        </Typography>
      }
      onClick={handleSubmitButton}
      {...restProps}
    />
  );
};

export default SubmitButton;
