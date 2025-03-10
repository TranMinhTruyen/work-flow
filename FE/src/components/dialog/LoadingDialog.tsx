import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { selectIsLoading } from '@/common/store/commonSlice';
import { useAppSelector } from '@/lib/store';

import CircleProgress from '../loading/CircleProgress';

const LoadingDialog = () => {
  const isLoading: boolean = useAppSelector(selectIsLoading);
  return (
    <Dialog
      open={isLoading}
      keepMounted
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
export default LoadingDialog;
