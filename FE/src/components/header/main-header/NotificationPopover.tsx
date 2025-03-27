import NotificationsIcon from '@mui/icons-material/Notifications';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { memo, MouseEvent, useCallback, useState } from 'react';

import { FULL_DATE_TIME_FORMAT } from '@/common/constants/commonConst';
import useWebSocket from '@/common/hooks/useWebSocket';
import INotification from '@/common/model/Notification';
import IconButton from '@/components/button/IconButton';

const NotificationPopover = () => {
  const [notificationList, setNotificationList] = useState<INotification[]>([]);
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>(null);

  const open = Boolean(anchorEl);

  useWebSocket<INotification>({
    receiveUrl: '/notification/receive',
    onSubscribe: (data: INotification) => {
      if (data) {
        setNotificationList(prev => {
          const newList = prev.slice();
          newList.push(data);
          return newList;
        });
      }
    },
  });

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (notificationList.length > 0) {
        setAnchorEl(event.currentTarget);
      }
    },
    [notificationList.length]
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <IconButton
        onClick={handleClick}
        icon={<NotificationsIcon fontSize={'small'} />}
        badgeContent={notificationList.length}
      />
      <StyledMenu
        anchorEl={anchorEl as unknown as Element}
        id={'notification-menu'}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            sx: {
              width: '400px',
              minWidth: '400px',
              overflow: 'visible',
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 12,
                height: 12,
                backgroundColor: 'inherit',
                transform: 'translateY(-50%) rotate(45deg)',
              },
            },
          },
        }}
      >
        {notificationList.map((item, index) => {
          return (
            <>
              <MenuItem key={index} onClick={handleClose}>
                <Stack sx={{ width: '100%' }} spacing={1}>
                  <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '16px !important',
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography>
                      {dayjs(item.sendDatetime).format(FULL_DATE_TIME_FORMAT)}
                    </Typography>
                  </Stack>

                  <Stack direction={'row'}>
                    <Typography
                      sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    >
                      {item.message}
                    </Typography>
                  </Stack>
                </Stack>
              </MenuItem>
              {index !== notificationList.length - 1 ? <Divider /> : null}
            </>
          );
        })}
      </StyledMenu>
    </>
  );
};

const StyledMenu = styled(Menu)({
  elevation: 0,
  overflow: 'visible',
  marginTop: 10,
});

export default memo(NotificationPopover);
