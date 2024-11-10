'use client';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';

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
        <Stack alignItems={'center'} justifyContent={'center'}>
          <svg width={0} height={0}>
            <defs>
              <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e01cd5" />
                <stop offset="100%" stopColor="#1CB5E0" />
              </linearGradient>
            </defs>
          </svg>
          <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default BackdropLoading;
