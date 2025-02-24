'use client';

import useDialog, { DialogContainerProps } from '@/common/hooks/useDialog';
import store from '@/lib/store';
import { useEffect, useMemo } from 'react';
import ConfirmDialog from './ConfirmDialog';
import LoadingDialog from './LoadingDialog';

export let openDialogContainer = (_props: DialogContainerProps) => {};

const DialogContainer = () => {
  const { openDialog, dialogProps, isPropsNull, dialogType } = useDialog();
  const isLoading: boolean = store.getState().commonState.isLoading;

  useEffect(() => {
    openDialogContainer = (props: DialogContainerProps) => openDialog(props);
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
