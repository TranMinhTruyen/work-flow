import { DialogContainerProps } from '@/components/dialog/DialogContainer';
import { useCallback, useEffect, useMemo, useState } from 'react';

type UseDialogProps = { open: boolean; dialogState?: DialogContainerProps };

const useDialog = () => {
  const [state, setState] = useState<UseDialogProps>({
    open: false,
  });
  const [countdown, setCountdown] = useState<number>(0);

  const openDialog = useCallback((newState: DialogContainerProps) => {
    const timeout =
      newState.timeout !== undefined && newState.timeout > 0 ? newState.timeout * 1000 : 10000;
    setCountdown(timeout / 1000);
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

  useEffect(() => {
    if (state.open && !state.dialogState?.autoClose && state.dialogState?.autoClose === true) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);

      const autoCloseTimer = setTimeout(() => {
        handleConfirm();
        setState(prev => ({
          ...prev,
          open: false,
        }));
      }, countdown * 1000);

      return () => {
        clearInterval(timer);
        clearTimeout(autoCloseTimer);
      };
    }
  }, [handleConfirm, state.dialogState?.autoClose, state.open, countdown]);

  // return all props of dialog
  const dialogProps = useMemo(
    () => ({
      ...state.dialogState,
      open: state.open,
      countdown: countdown,
      onCancel: () => handleCancel(),
      onConfirm: () => handleConfirm(),
    }),
    [countdown, handleCancel, handleConfirm, state.dialogState, state.open]
  );

  return {
    openDialog,
    dialogProps,
    isPropsNull: !state.dialogState ? true : false,
    dialogType: state.dialogState?.type,
  };
};

export default useDialog;
