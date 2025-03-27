import { ReactNode } from 'react';

export type SnackBarProps = {
  severity: 'success' | 'info' | 'warning' | 'error';
  message?: ReactNode;
};

export type UseSnackBarProps = {
  open: boolean;
  snackbarState: SnackBarProps;
};
