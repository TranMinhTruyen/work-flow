import NotificationsIcon from '@mui/icons-material/Notifications';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { memo, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';

import { FULL_DATE_TIME_FORMAT } from '@/common/constants/commonConst';
import { ModalRef } from '@/common/hooks/types/useModalTypes';
import useWebSocket from '@/common/hooks/useWebSocket';
import { INotificationResponse } from '@/common/model/Notification';
import { IPageRequest } from '@/common/model/Pageable';
import { selectLanguage, selectLoginData } from '@/common/store/commonSlice';
import IconButton from '@/components/button/IconButton';
import CircleProgress from '@/components/loading/CircleProgress';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { notificationService } from '@/services/notificationService';

import NotificationDetail from './NotificationDetail';

const defaultPageable: IPageRequest = {
  page: 1,
  size: 10,
  orderList: [
    {
      orderBy: 'send_date_time',
      direction: 'desc',
    },
  ],
};

const NotificationPopover = () => {
  const [notificationList, setNotificationList] = useState<INotificationResponse[]>([]);
  const [notificationPageable, setNotificationPageable] = useState<IPageRequest>(defaultPageable);
  const [totalNotRead, setTotalNotRead] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>(null);

  const modalRef = useRef<ModalRef<null, INotificationResponse>>(null);
  const dispatch = useAppDispatch();
  const open = Boolean(anchorEl);
  const loginData = useAppSelector(selectLoginData);
  const language = useAppSelector(selectLanguage);
  const lastCalledLanguage = useRef<string>(language);
  const callGetNotification = useRef<boolean>(true);

  /**
   * Get user notificaiton via websocket.
   */
  useWebSocket<INotificationResponse>({
    receiveUrl: `/user/${loginData?.userId}/notification/receive`,
    onSubscribe: async (data: INotificationResponse) => {
      if (data) {
        setNotificationList(prev => {
          return [data, ...prev];
        });
        setTotalNotRead(prev => prev + 1);
      }
    },
  });

  /**
   * Get notification from server.
   */
  const getNotification = useCallback(async () => {
    if (!callGetNotification.current) return;

    setLoading(true);
    const response = await dispatch(
      notificationService.endpoints.getNotification.initiate(notificationPageable)
    ).unwrap();
    if (response) {
      if (response.notification && callGetNotification.current) {
        setHasMore(response.notification.page !== response.notification.totalPages);
        setNotificationList(prev => {
          return [...prev, ...(response.notification?.result || [])];
        });
      }
      if (response.totalNotRead) {
        setTotalNotRead(response.totalNotRead);
      }
      setLoading(false);
    }
  }, [dispatch, notificationPageable]);

  useEffect(() => {
    if (lastCalledLanguage.current === language) return;
    lastCalledLanguage.current = language;
    setNotificationList([]);
    getNotification();
  }, [getNotification, language]);

  useEffect(() => {
    getNotification();
  }, [getNotification, notificationPageable]);

  /**
   * Open notification list.
   */
  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      callGetNotification.current = true;
      setNotificationList([]);
      getNotification();
    },
    [getNotification]
  );

  /**
   * Close notification.
   */
  const handleClose = useCallback(() => {
    setAnchorEl(null);

    //Set call flg to false to revent call api get notification
    //when reset notification pageable
    callGetNotification.current = false;
    setNotificationList([]);
    setNotificationPageable(defaultPageable);
  }, []);

  /**
   * Open notification detail modal.
   */
  const handleNotificateDetail = useCallback(
    (id?: string) => async () => {
      if (modalRef.current && id) {
        const response = await dispatch(
          notificationService.endpoints.setIsRead.initiate({ id: id, language: language })
        ).unwrap();
        if (response) {
          setNotificationList(prev =>
            prev.map(item => (item.id === response.id ? { ...item, read: true } : item))
          );
          setTotalNotRead(prev => (prev > 0 ? prev - 1 : prev));
          await modalRef.current.open({
            inputValue: response,
          });
        }
      }
    },
    [dispatch, language]
  );

  const handleOnScroll = useCallback(
    (event: { currentTarget: any }) => {
      const current = event.currentTarget;
      if (current.scrollTop + current.clientHeight >= current.scrollHeight && hasMore) {
        callGetNotification.current = true;
        setNotificationPageable(prev => ({
          ...prev,
          page: prev.page + 1,
        }));
      }
    },
    [hasMore]
  );

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
        <Stack onScroll={handleOnScroll} sx={{ maxHeight: '500px', overflow: 'auto' }}>
          {notificationList.map((item, index) => {
            return (
              <Stack key={`notification-item-${index}`}>
                <MenuItem
                  key={index}
                  value={item.id}
                  onClick={handleNotificateDetail(item.id)}
                  sx={{
                    backgroundColor: item.read
                      ? 'rgba(255, 255, 255, 1)'
                      : 'rgba(142, 232, 255, 0.5)',
                  }}
                >
                  <Stack sx={{ width: '100%' }} spacing={1}>
                    <Box>
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
                    </Box>

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
        {loading ? <CircleProgress /> : null}
      </StyledMenu>
      <NotificationDetail ref={modalRef} />
    </>
  );
};

const StyledMenu = styled(Menu)({
  elevation: 0,
  overflow: 'visible',
  marginTop: 10,
});

export default memo(NotificationPopover);
