import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useEffect } from 'react';

import useSnackBar from '@/common/hooks/useSnackbar';

import { SnackBarProps } from './type';

export let openSnackBarContainer = (_props: SnackBarProps) => {};

const SnackBarContainer = () => {
  const { openSnackBar, open, severity, message, closeSnackBar } = useSnackBar();

  useEffect(() => {
    openSnackBarContainer = (props: SnackBarProps) =>
      openSnackBar({
        ...props,
      });
  }, [openSnackBar]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={6000}
      onClose={closeSnackBar}
    >
      <Alert severity={severity} variant={'filled'} sx={{ width: '100%' }} onClose={closeSnackBar}>
        {message}
      </Alert>
    </Snackbar>
  );
};
export default SnackBarContainer;
