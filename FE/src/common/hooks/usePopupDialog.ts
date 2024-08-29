import { DialogContainerProps } from 'components/dialog/PopupDialogContainer';
import { useCallback, useMemo, useState } from 'react';

type UsePopupDialogProps = { open: boolean; dialogState?: DialogContainerProps };

const usePopupDialog = () => {
  const [state, setState] = useState<UsePopupDialogProps>({
    open: false,
  });

  const openDialog = useCallback((newState?: DialogContainerProps) => {
    setState(prev => ({
      ...prev,
      open: true,
      dialogState: newState,
    }));
  }, []);

  // handle when click button confirm
  const handleConfirm = useCallback(() => {
    state.dialogState?.onConfirm?.();
    setState(prev => ({
      ...prev,
      open: false,
    }));
  }, [state.dialogState]);

  // handle when click cancel confirm
  const handleCancel = useCallback(() => {
    state.dialogState?.onCancel?.();
    setState(prev => ({
      ...prev,
      open: false,
    }));
  }, [state.dialogState]);

  // return all props og dialog
  const dialogProps = useMemo(
    () => ({
      ...state.dialogState,
      open: state.open,
      onCancel: () => handleCancel(),
      onConfirm: () => handleConfirm(),
    }),
    [handleCancel, handleConfirm, state.dialogState, state.open]
  );

  return {
    openDialog,
    dialogProps,
    isPropsNull: state.dialogState === undefined ? true : false,
    dialogType: state.dialogState?.type,
  };
};

export default usePopupDialog;
