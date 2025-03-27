import { useCallback, useState } from 'react';

import { SnackBarProps, UseSnackBarProps } from '@/components/snackbar/type';

const useSnackBar = () => {
  const [state, setState] = useState<UseSnackBarProps>({
    open: false,
    snackbarState: {
      severity: 'success',
    },
  });

  const openSnackBar = useCallback((newState: SnackBarProps) => {
    setState(prev => ({
      ...prev,
      open: true,
      snackbarState: newState,
    }));
  }, []);

  const closeSnackBar = useCallback(() => {
    setState(prev => ({
      ...prev,
      open: false,
    }));
  }, []);

  return {
    open: state.open,
    severity: state.snackbarState.severity,
    message: state.snackbarState.message,
    openSnackBar,
    closeSnackBar,
  };
};

export default useSnackBar;
