import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { memo, Ref } from 'react';

import { ModalRef } from '@/common/hooks/types/useModalTypes';
import useModal from '@/common/hooks/useModal';
import { INotificationResponse } from '@/common/model/Notification';

type NotificationDetailProps = {
  ref: Ref<ModalRef<null, INotificationResponse>>;
};

const NotificationDetail = (props: NotificationDetailProps) => {
  const { inputValue, handleClose, openModal } = useModal<null, INotificationResponse>(props.ref);

  return (
    <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth={'md'}>
      <Container>
        <Stack spacing={1}>
          <Typography>{inputValue?.title}</Typography>
          <Typography>{inputValue?.message}</Typography>
        </Stack>
      </Container>
    </Dialog>
  );
};

export default memo(NotificationDetail);
