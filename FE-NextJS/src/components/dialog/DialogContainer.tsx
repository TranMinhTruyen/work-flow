'use client';
import { memo, useEffect } from 'react';
import ConfirmDialog, { ConfirmDialogProps } from './ConfirmDialog';
import LoadingDialog from './LoadingDialog';
import usePopupDialog from '@/common/hooks/useDialog';
import { useAppSelector } from '@/lib/store';
import { selectIsLoading } from '@/lib/slices/commonSlice';

export type DialogContainerProps = Omit<ConfirmDialogProps, 'open' | 'showCancelButton'> & {
  type: DialogType;
};

type DialogType = 'confirm' | 'loading' | 'message';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export let openDialogContainer = (_props: DialogContainerProps) => {};

const DialogContainer = () => {
  const { openDialog, dialogProps, isPropsNull, dialogType } = usePopupDialog();
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
    case 'message':
      if (!isLoading) {
        return <ConfirmDialog {...dialogProps} />;
      }
    case 'loading':
      return <LoadingDialog />;
  }
};

export default memo(DialogContainer);
