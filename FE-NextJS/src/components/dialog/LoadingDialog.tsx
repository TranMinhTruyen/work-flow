'use client';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useAppSelector } from '@/lib/store';
import { selectIsLoading } from '@/lib/slices/commonSlice';
import CircleProgress from '../loading/CircleProgress';

const LoadingDialog = () => {
  const isLoading: boolean = useAppSelector(selectIsLoading);
  return (
    <Dialog keepMounted open={isLoading} maxWidth={'xs'}>
      <DialogContent sx={{ padding: 3.5 }}>
        <CircleProgress />
      </DialogContent>
    </Dialog>
  );
};
export default LoadingDialog;
