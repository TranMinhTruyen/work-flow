'use client';
import { ReactNode, useCallback, useMemo } from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { MessageType } from '@/common/enums/MessageEnum';
import FloatButton from '../button/FloatButton';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'react-i18next';
import { I18nEnum } from '@/common/enums/I18nEnum';

export type ConfirmDialogProps = Omit<DialogProps, 'title'> & {
  message?: ReactNode;
  messageType?: MessageType;
  cancelText?: string;
  confirmText?: string;
  isPopup?: boolean;
  showCancelButton?: boolean;
  showCloseButton?: boolean;
  autoClose?: boolean;
  showCountdown?: boolean;
  countdown?: number;
  timeout?: number;
  onConfirm?: () => void;
  onCancel?: () => void;
};

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const {
    open,
    message,
    messageType,
    cancelText,
    confirmText,
    isPopup = true,
    showCancelButton,
    showCloseButton = true,
    autoClose = false,
    showCountdown = true,
    countdown,
    onConfirm,
    onCancel,
    maxWidth = 'xs',
    ...restProps
  } = props;

  const { t } = useTranslation(I18nEnum.COMMON_I18N);

  const handleConfirmClick = useCallback(() => {
    onConfirm?.();
  }, [onConfirm]);

  const handleCancelClick = useCallback(() => {
    onCancel?.();
  }, [onCancel]);

  const dialogHeader = useMemo(() => {
    switch (messageType) {
      case MessageType.WARN:
        return (
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Typography sx={{ fontSize: 25, color: 'rgba(255, 200, 0, 1)' }}>
              {t(MessageType.WARN)}
            </Typography>
            <ErrorIcon color={'warning'} />
          </Stack>
        );
      case MessageType.ERROR:
        return (
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Typography sx={{ fontSize: 25, color: 'rgba(225, 0, 0, 1)' }}>
              {t(MessageType.ERROR)}
            </Typography>
            <ErrorIcon color={'error'} />
          </Stack>
        );
      case MessageType.INFO:
        return (
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Typography sx={{ fontSize: 25, color: 'rgba(0, 80, 255, 1)' }}>
              {t(MessageType.INFO)}
            </Typography>
            <InfoIcon color={'primary'} />
          </Stack>
        );
      case MessageType.SUCCESS:
        return (
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Typography sx={{ fontSize: 25, color: 'rgba(0, 225, 0, 1)' }}>
              {t(MessageType.SUCCESS)}
            </Typography>
            <CheckCircleIcon color={'primary'} />
          </Stack>
        );
    }
  }, [messageType, t]);

  const messageElement = useMemo(() => {
    if (message) {
      if (typeof message === 'string') {
        return <Typography sx={{ fontSize: 20 }}>{message}</Typography>;
      } else {
        return message;
      }
    } else {
      return null;
    }
  }, [message]);

  const cancelButton = useMemo(() => {
    if (showCancelButton !== undefined && showCancelButton) {
      return (
        <FloatButton
          label={
            <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
              {cancelText ?? 'Cancel'}
            </Typography>
          }
          sx={{
            width: 120,
            height: 40,
            backgroundColor: 'rgba(255, 50, 50, 0.8)',
          }}
          onClick={handleCancelClick}
        />
      );
    }
  }, [cancelText, handleCancelClick, showCancelButton]);

  const dialogBody = useMemo(
    () => (
      <>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            padding: '10px',
          }}
        >
          {dialogHeader}
          {showCloseButton ? (
            <IconButton onClick={handleCancelClick} sx={{ position: 'absolute', right: 8 }}>
              <CloseIcon />
            </IconButton>
          ) : null}
        </Box>

        <Divider />

        <DialogContent sx={{ padding: 2.5 }}>
          <Stack alignItems={'center'}>
            {messageElement}
            {showCountdown && autoClose ? countdown : null}
          </Stack>
        </DialogContent>

        <Divider />

        <DialogActions sx={{ justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
          <Stack direction={'row'} alignItems={'center'} spacing={10}>
            <FloatButton
              label={
                <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {confirmText ?? 'OK'}
                </Typography>
              }
              sx={{
                width: 120,
                height: 40,
                backgroundColor: 'rgba(0, 170, 255, 0.8)',
              }}
              onClick={handleConfirmClick}
            />
            {cancelButton}
          </Stack>
        </DialogActions>
      </>
    ),
    [
      dialogHeader,
      showCloseButton,
      handleCancelClick,
      messageElement,
      showCountdown,
      autoClose,
      countdown,
      confirmText,
      handleConfirmClick,
      cancelButton,
    ]
  );

  return isPopup ? (
    <Dialog
      open={open}
      fullWidth={true}
      maxWidth={maxWidth}
      onClose={handleCancelClick}
      {...restProps}
    >
      {dialogBody}
    </Dialog>
  ) : (
    <Dialog open={open} fullWidth={true} maxWidth={maxWidth} {...restProps}>
      {dialogBody}
    </Dialog>
  );
};

export default ConfirmDialog;
