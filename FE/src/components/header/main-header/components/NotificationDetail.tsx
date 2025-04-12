import CloseIcon from '@mui/icons-material/Close';
import { Box, Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { memo, Ref } from 'react';

import { FULL_DATE_TIME_FORMAT } from '@/common/constants/commonConst';
import { ModalRef } from '@/common/hooks/types/useModalTypes';
import useModal from '@/common/hooks/useModal';
import { INotificationResponse } from '@/common/model/Notification';
import Button from '@/components/button/Button';
import IconButton from '@/components/button/IconButton';

type NotificationDetailProps = {
  ref: Ref<ModalRef<null, INotificationResponse>>;
};

const NotificationDetail = (props: NotificationDetailProps) => {
  const { inputValue, handleClose, openModal } = useModal<null, INotificationResponse>(props.ref);

  return (
    <Dialog open={openModal} onClose={handleClose} fullWidth>
      <Stack sx={{ height: '300px' }}>
        <Stack direction={'row'} sx={{ height: '45px', padding: '8px' }}>
          <Stack sx={{ flex: 1, marginLeft: '30px' }}>
            <Typography variant={'h5'}>{inputValue?.title}</Typography>
          </Stack>
          <IconButton
            width={30}
            height={30}
            onClick={handleClose}
            color={'primary'}
            icon={<CloseIcon />}
          />
        </Stack>

        <Divider />

        <Stack sx={{ height: '100%', padding: '8px', overflow: 'auto' }} spacing={1}>
          <Stack direction={'row'} spacing={10}>
            <Typography sx={{ fontWeight: 'bold' }}>Send by: {inputValue?.sendBy}</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>
              Send time: {dayjs(inputValue?.sendDatetime).format(FULL_DATE_TIME_FORMAT)}
            </Typography>
          </Stack>

          <Box sx={{ height: '100%', overflow: 'auto' }}>
            <Typography>{inputValue?.message}</Typography>
          </Box>
        </Stack>

        <Divider />

        <Stack sx={{ padding: '8px' }} direction={'row-reverse'}>
          <Button label={'OK'} sx={styles.button} onClick={handleClose} />
        </Stack>
      </Stack>
    </Dialog>
  );
};

const styles = {
  button: {
    minWidth: '100px',
    backgroundColor: 'rgba(0, 170, 255, 0.8)',
    height: '30px',
  },

  buttonLabel: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    paddingTop: '1px',
  },
};

export default memo(NotificationDetail);
