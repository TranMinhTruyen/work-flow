import { memo, useEffect, useState } from 'react';
import ConfirmDialog, { ConfirmDialogProps } from './ConfirmDialog';
import { useAppDispatch } from 'common/store';
import LoadingDialog from './LoadingDialog';
import { toggleConfirmDialog, toggleLoading } from 'common/commonSlice';

type DialogContainerProps = Omit<ConfirmDialogProps, 'open' | 'showCancelButton'> & {
  type: DialogType;
};

type DialogType = 'confirm' | 'loading' | 'message';

export let openDialogContainer = (_props: DialogContainerProps) => {};

const DialogContainer = () => {
  const [dialogProps, setDialogProps] = useState<DialogContainerProps>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    openDialogContainer = (props: DialogContainerProps) => {
      setDialogProps(props);
      if (props.type === 'confirm' || props.type === 'message') {
        dispatch(toggleConfirmDialog(true));
      }
      if (props.type === 'loading') {
        dispatch(toggleLoading(true));
      }
    };
  }, [dispatch]);

  if (!dialogProps) return null;

  // Return dialog component
  switch (dialogProps.type) {
    case 'confirm':
      return <ConfirmDialog showCancelButton={true} {...dialogProps} />;
    case 'message':
      return <ConfirmDialog {...dialogProps} />;
    case 'loading':
      return <LoadingDialog />;
  }
};

export default memo(DialogContainer);
