import Typography from '@mui/material/Typography';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { I18nEnum } from '@/common/enums/i18nEnum';
import { MessageType } from '@/common/enums/messageEnum';

import { openDialogContainer } from '../dialog/DialogContainer';
import Button, { ButtonProps } from './Button';

export type SubmitButtonProps = Omit<ButtonProps, 'onClick'> & {
  onSubmit?: () => void;
  isDirty?: boolean;
};

const SubmitButton = (props: SubmitButtonProps) => {
  const { onSubmit, isDirty = true, className, sx, ...restProps } = props;

  const { t } = useTranslation(I18nEnum.COMMON_I18N);

  const handleClick = useCallback(() => {
    if (isDirty) {
      openDialogContainer({
        type: 'message',
        maxWidth: 'xs',
        messageType: MessageType.INFO,
        isPopup: false,
        onConfirm: onSubmit,
        showCancelButton: true,
        bodyElement: <Typography>{t('buttonMessage.submit')}</Typography>,
      });
    } else {
      openDialogContainer({
        type: 'message',
        maxWidth: 'xs',
        messageType: MessageType.WARN,
        isPopup: false,
        onConfirm: onSubmit,
        showCancelButton: true,
        bodyElement: <Typography>{t('buttonMessage.submitWarning')}</Typography>,
      });
    }
  }, [isDirty, onSubmit, t]);

  return (
    <Button
      className={className}
      sx={{ backgroundColor: 'rgba(0, 170, 255, 0.8)', ...sx }}
      label={t('button.submit')}
      onClick={handleClick}
      {...restProps}
    />
  );
};

export default SubmitButton;
