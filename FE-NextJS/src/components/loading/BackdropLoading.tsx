'use client';
import { memo } from 'react';
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
          <CircularProgress color={'primary'} />
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default memo(BackdropLoading);
