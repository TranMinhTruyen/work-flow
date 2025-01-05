'use client';
import useDialog from '@/common/hooks/useDialog';
import { selectIsLoading } from '@/lib/slices/commonSlice';
import { useAppSelector } from '@/lib/store';
import { useEffect } from 'react';
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

  if (isPropsNull) return null;

  // Return dialog component
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
};

export default DialogContainer;
