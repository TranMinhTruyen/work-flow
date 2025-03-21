import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';

import CircleProgress from './CircleProgress';

const BackdropLoading = () => {
  return (
    <BackdropDialog
      keepMounted
      open={true}
      maxWidth={'xs'}
      disableScrollLock
      sx={{
        position: 'absolute',
      }}
    >
      <DialogContent sx={{ padding: 3.5 }}>
        <CircleProgress />
      </DialogContent>
    </BackdropDialog>
  );
};

const BackdropDialog = styled(Dialog)<DialogProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export default BackdropLoading;
