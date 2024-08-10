import { memo, useEffect, useState } from 'react';
import ConfirmDialog, { ConfirmDialogProps } from './ConfirmDialog';
import { useAppDispatch } from 'common/store';
import LoadingDialog from './LoadingDialog';
import { toggleConfirmDialog, toggleLoading } from 'common/commonSlice';

type DialogContainerProps = {
  type: DialogType;
} & Omit<ConfirmDialogProps, 'open'>;

type DialogType = 'confirm' | 'loading';

export let openDialogContainer = (_props: DialogContainerProps) => {};

const DialogContainer = () => {
  const [dialogProps, setDialogProps] = useState<DialogContainerProps>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    openDialogContainer = (props: DialogContainerProps) => {
      setDialogProps(props);
      if (props.type === 'confirm') {
        dispatch(toggleConfirmDialog(true));
      }
      if (props.type === 'loading') {
        dispatch(toggleLoading(true));
      }
    };
  }, [dispatch]);

  if (!dialogProps) return null;

  if (dialogProps.type === 'confirm') {
    return <ConfirmDialog {...dialogProps} />;
  }

  if (dialogProps.type === 'loading') {
    return <LoadingDialog />;
  }

  return null;
};

export default memo(DialogContainer);
