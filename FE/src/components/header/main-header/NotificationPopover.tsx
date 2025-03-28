import NotificationsIcon from '@mui/icons-material/Notifications';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { memo, MouseEvent, useCallback, useEffect, useState } from 'react';

import { FULL_DATE_TIME_FORMAT } from '@/common/constants/commonConst';
import useWebSocket from '@/common/hooks/useWebSocket';
import { INotificationResponse } from '@/common/model/Notification';
import { IPageRequest } from '@/common/model/Pageable';
import IconButton from '@/components/button/IconButton';
import { useAppDispatch } from '@/lib/store';
import { notificationService } from '@/services/notificationService';

const NotificationPopover = () => {
  const [notificationList, setNotificationList] = useState<INotificationResponse[]>([]);
  const [notificationPageable, setNotificationPageable] = useState<IPageRequest>({
    page: 1,
    size: 10,
    orderList: [
      {
        orderBy: 'send_date_time',
        direction: 'desc',
      },
    ],
  });
  const [totalNotRead, setTotalNotRead] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>(null);
  const dispatch = useAppDispatch();

  const open = Boolean(anchorEl);

  useWebSocket<INotificationResponse>({
    receiveUrl: '/notification/receive',
    onSubscribe: async (data: INotificationResponse) => {
      if (data) {
        const response: INotificationResponse = await dispatch(
          notificationService.endpoints.createNotification.initiate({ ...data, read: false })
        ).unwrap();
        setNotificationList(prev => {
          const newList = prev.slice();
          newList.push(response);
          return newList;
        });
      }
    },
  });

  const getNotification = useCallback(async () => {
    const response = await dispatch(
      notificationService.endpoints.getNotification.initiate(notificationPageable)
    ).unwrap();
    if (response) {
      if (response.notification) {
        setNotificationList(response.notification?.result ?? []);
      }
      if (response.totalNotRead) {
        setTotalNotRead(response.totalNotRead);
      }
    }
  }, [dispatch, notificationPageable]);

  useEffect(() => {
    getNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (notificationList.length > 0) {
        setAnchorEl(event.currentTarget);
      }
    },
    [notificationList]
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <IconButton
        onClick={handleClick}
        icon={<NotificationsIcon fontSize={'small'} />}
        badgeContent={totalNotRead}
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
        <Stack sx={{ maxHeight: '500px', overflow: 'auto' }}>
          {notificationList.map((item, index) => {
            return (
              <Stack key={`notification-item-${index}`}>
                <MenuItem
                  onClick={handleClose}
                  sx={{
                    backgroundColor: item.read
                      ? 'rgba(255, 255, 255, 1)'
                      : 'rgba(142, 232, 255, 0.5)',
                  }}
                >
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
                {index !== notificationList.length - 1 ? (
                  <Divider sx={{ margin: '0px !important' }} />
                ) : null}
              </Stack>
            );
          })}
        </Stack>
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
