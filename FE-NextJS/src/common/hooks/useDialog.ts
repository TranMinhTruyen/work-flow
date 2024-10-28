import { useCallback, useEffect, useMemo, useState } from 'react';
import { DialogContainerProps } from '@/components/dialog/DialogContainer';

type UseDialogProps = { open: boolean; dialogState?: DialogContainerProps };

const usePopupDialog = () => {
  const [state, setState] = useState<UseDialogProps>({
    open: false,
  });

  useEffect(() => {
    if (
      state.open &&
      state.dialogState?.autoClose !== undefined &&
      state.dialogState?.autoClose === true
    ) {
      const timeout =
        state.dialogState.timeout !== undefined && state.dialogState.timeout > 0
          ? state.dialogState.timeout
          : 10000;

      const timer = setTimeout(() => {
        setState(prev => ({
          ...prev,
          open: false,
        }));
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [state.dialogState?.autoClose, state.dialogState?.timeout, state.open]);

  const openDialog = useCallback((newState: DialogContainerProps) => {
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

  // return all props of dialog
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
