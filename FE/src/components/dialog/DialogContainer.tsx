import { Breakpoint } from '@mui/material/styles';
import { ReactNode, useEffect, useMemo } from 'react';

import { MessageType } from '@/common/enums/messageEnum';
import useDialog, { DialogType } from '@/common/hooks/useDialog';
import store from '@/lib/store';

import ConfirmDialog from './ConfirmDialog';
import LoadingDialog from './LoadingDialog';

type DialogProps = {
  type: DialogType;
  maxWidth?: Breakpoint | false;
  bodyElement?: ReactNode;
  messageType?: MessageType;
  cancelText?: string;
  confirmText?: string;
  isPopup?: boolean;
  showCancelButton?: boolean;
  showCloseButton?: boolean;
  /**
   * Auto close dialog after timeout
   * @default false
   */
  autoClose?: boolean;
  /**
   * Show countdown time
   * @default true
   */
  showCountdown?: boolean;
  /**
   * Countdown time
   * @default 10 second
   */
  timeout?: number;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export let openDialogContainer = (_props: DialogProps) => {};

const DialogContainer = () => {
  const { openDialog, dialogProps, isPropsNull, dialogType } = useDialog();
  const isLoading: boolean = store.getState().commonState.isLoading;

  useEffect(() => {
    openDialogContainer = (props: DialogProps) =>
      openDialog({
        ...props,
      });
  }, [openDialog]);

  // Return dialog component
  const returnDialog = useMemo(() => {
    if (isPropsNull) return null;

    switch (dialogType) {
      case 'confirm':
        if (!isLoading) {
          return <ConfirmDialog showCancelButton={true} {...dialogProps} />;
        }
        break;
      case 'message':
        if (!isLoading) {
          return <ConfirmDialog {...dialogProps} />;
        }
        break;
      case 'loading':
        return <LoadingDialog />;
    }
  }, [dialogProps, dialogType, isLoading, isPropsNull]);

  return returnDialog;
};

export default DialogContainer;
