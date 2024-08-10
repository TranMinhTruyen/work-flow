import { CircularProgress, Dialog, DialogContent, Stack } from '@mui/material';
import { useAppSelector } from 'common/store';
import { selectIsLoading } from 'common/commonSlice';
import { memo } from 'react';

const LoadingDialog = () => {
  const isLoading = useAppSelector(selectIsLoading);
  return (
    <Dialog keepMounted open={isLoading} maxWidth={'xs'}>
      <DialogContent sx={{ padding: 3.5 }}>
        <Stack alignItems={'center'}>
          <CircularProgress color="primary" />
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
export default memo(LoadingDialog);
