import { useEffect, useMemo } from 'react';

import useDialog from '@/common/hooks/useDialog';
import store from '@/lib/store';

import ConfirmDialog from './ConfirmDialog';
import { DialogProps } from './type';

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
    }
  }, [dialogProps, dialogType, isLoading, isPropsNull]);

  return returnDialog;
};

export default DialogContainer;
