'use client';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '@/lib/store';
import { selectIsLoading } from '@/lib/slices/commonSlice';

const LoadingDialog = () => {
  const isLoading: boolean = useAppSelector(selectIsLoading);
  return (
    <Dialog keepMounted open={isLoading} maxWidth={'xs'}>
      <DialogContent sx={{ padding: 3.5 }}>
        <Stack alignItems={'center'} justifyContent={'center'}>
          <CircularProgress color={'primary'} />
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
export default LoadingDialog;
