'use client';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '@/common/store';
import { selectIsLoading } from '@/common/commonSlice';

const PopupLoadingDialog = () => {
  const isLoading = useAppSelector(selectIsLoading);
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
export default PopupLoadingDialog;
