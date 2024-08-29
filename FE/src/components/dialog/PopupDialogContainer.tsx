import { memo, useEffect } from 'react';
import ConfirmDialog, { PopupConfirmDialogProps } from './PopupConfirmDialog';
import LoadingDialog from './PopupLoadingDialog';
import usePopupDialog from 'common/hooks/usePopupDialog';

export type DialogContainerProps = Omit<PopupConfirmDialogProps, 'open' | 'showCancelButton'> & {
  type: DialogType;
};

type DialogType = 'confirm' | 'loading' | 'message';

export let openPopupDialogContainer = (_props: DialogContainerProps) => {};

const PopupDialogContainer = () => {
  const { isPropsNull, openDialog, dialogProps, dialogType } = usePopupDialog();

  useEffect(() => {
    openPopupDialogContainer = (props: DialogContainerProps) => openDialog(props);
  }, [openDialog]);

  if (isPropsNull) return null;

  // Return dialog component
  switch (dialogType) {
    case 'confirm':
      return <ConfirmDialog showCancelButton={true} {...dialogProps} />;
    case 'message':
      return <ConfirmDialog {...dialogProps} />;
    case 'loading':
      return <LoadingDialog />;
  }
};

export default memo(PopupDialogContainer);
