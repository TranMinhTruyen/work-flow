'use client';

import useDialog from '@/common/hooks/useDialog';
import { selectIsLoading } from '@/common/store/commonSlice';
import { useAppSelector } from '@/lib/store';
import { useEffect, useMemo } from 'react';
import ConfirmDialog, { ConfirmDialogProps } from './ConfirmDialog';
import LoadingDialog from './LoadingDialog';

export type DialogContainerProps = Omit<ConfirmDialogProps, 'open' | 'showCancelButton'> & {
  type: DialogType;
};

type DialogType = 'confirm' | 'loading' | 'message';

export let openDialogContainer = (_props: DialogContainerProps) => {};

const DialogContainer = () => {
  const { openDialog, dialogProps, isPropsNull, dialogType } = useDialog();
  const isLoading: boolean = useAppSelector(selectIsLoading);

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
