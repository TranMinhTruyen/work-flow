import Typography from '@mui/material/Typography';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { MessageParams } from '@/common/constants/typeConst';
import { I18nEnum } from '@/common/enums/i18nEnum';
import { MessageType } from '@/common/enums/messageEnum';
import { getMessage } from '@/common/utils/stringUtil';

import { openDialogContainer } from '../dialog/DialogContainer';
import Button, { ButtonProps } from './Button';

export type SubmitButtonProps = Omit<ButtonProps, 'onClick'> & {
  onSubmit?: () => void;
  isDirty?: boolean;
  submitMessage?: MessageParams;
  submitWarningMessage?: MessageParams;
};

const SubmitButton = (props: SubmitButtonProps) => {
  const { t } = useTranslation(I18nEnum.COMMON_I18N);

  const {
    label = t('button.submit'),
    onSubmit,
    isDirty = true,
    className,
    sx,
    submitMessage = {
      messageCode: 'M0000001',
      args: [(label as string).toLowerCase()],
    },
    submitWarningMessage = {
      messageCode: 'M0000002',
      args: [(label as string).toLowerCase()],
    },
    ...restProps
  } = props;

  const handleClick = useCallback(() => {
    if (isDirty) {
      openDialogContainer({
        type: 'message',
        maxWidth: 'xs',
        messageType: MessageType.INFO,
        isPopup: false,
        onConfirm: onSubmit,
        showCancelButton: true,
        bodyElement: (
          <Typography>
            {getMessage(submitMessage.messageCode, ...(submitMessage.args ?? []))}
          </Typography>
        ),
      });
    } else {
      openDialogContainer({
        type: 'message',
        maxWidth: 'xs',
        messageType: MessageType.WARN,
        isPopup: false,
        onConfirm: onSubmit,
        showCancelButton: true,
        bodyElement: (
          <Typography>
            {getMessage(submitWarningMessage.messageCode, ...(submitWarningMessage.args ?? []))}
          </Typography>
        ),
      });
    }
  }, [isDirty, onSubmit, submitMessage, submitWarningMessage]);

  return (
    <Button
      className={className}
      sx={{ backgroundColor: 'rgba(0, 170, 255, 0.8)', ...sx }}
      label={label}
      onClick={handleClick}
      {...restProps}
    />
  );
};

export default SubmitButton;
