import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CircleProgress from './CircleProgress';

const BackdropLoading = () => {
  return (
    <Dialog
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
    </Dialog>
  );
};

export default BackdropLoading;
