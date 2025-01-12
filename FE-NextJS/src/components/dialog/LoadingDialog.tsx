'use client';
import { selectIsLoading } from '@/common/store/commonSlice';
import { useAppSelector } from '@/lib/store';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
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
