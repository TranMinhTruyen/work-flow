import Typography from '@mui/material/Typography';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { MessageParams } from '@/common/constants/typeConst';
import { I18nEnum } from '@/common/enums/i18nEnum';
import { MessageType } from '@/common/enums/messageEnum';
import { getMessage } from '@/common/utils/stringUtil';

import { openDialogContainer } from '../dialog/DialogContainer';
import IconButton, { IconButtonProps } from './IconButton';

export type SubmitIconButtonProps = Omit<IconButtonProps, 'onClick'> & {
  onSubmit?: () => void;
  isDirty?: boolean;
  submitMessage?: MessageParams;
  submitWarningMessage?: MessageParams;
};

const SubmitIconButton = (props: SubmitIconButtonProps) => {
  const { t } = useTranslation(I18nEnum.COMMON_I18N);

  const {
    onSubmit,
    isDirty = true,
    submitMessage = {
      messageCode: 'M0000001',
      args: [t('button.submit').toLowerCase()],
    },
    submitWarningMessage = {
      messageCode: 'M0000002',
      args: [t('button.submit').toLowerCase()],
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

  return <IconButton onClick={handleClick} {...restProps} />;
};
export default SubmitIconButton;
