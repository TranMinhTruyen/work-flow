import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';

import CircleProgress from './CircleProgress';

export type BackdropLoadingProps = {
  open: boolean;
};

const BackdropLoading = (props: BackdropLoadingProps) => {
  const { open } = props;
  return (
    <BackdropDialog
      keepMounted
      open={open}
      disableScrollLock
      slotProps={{
        paper: {
          sx: { borderRadius: '50%' },
        },
      }}
    >
      <DialogContent sx={{ padding: '8px' }}>
        <CircleProgress />
      </DialogContent>
    </BackdropDialog>
  );
};

const BackdropDialog = styled(Dialog)<DialogProps>(({ theme }) => ({
  zIndex: theme.zIndex.tooltip + 1,
}));

export default BackdropLoading;
