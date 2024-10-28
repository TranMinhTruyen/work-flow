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

export type ConfirmDialogProps = DialogProps & {
  title?: ReactNode;
  message?: ReactNode;
  messageType?: MessageType;
  cancelText?: string;
  confirmText?: string;
  isPopup?: boolean;
  autoClose?: boolean;
  timeout?: number;
  showCancelButton?: boolean;
  showCloseButton?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
};

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const {
    open,
    title,
    message,
    messageType,
    cancelText,
    confirmText,
    isPopup = true,
    showCancelButton,
    showCloseButton = true,
    onConfirm,
    onCancel,
    maxWidth = 'xs',
    ...restProps
  } = props;

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
              {title ?? null}
            </Typography>
            <ErrorIcon color={'warning'} />
          </Stack>
        );
      case MessageType.ERROR:
        return (
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Typography sx={{ fontSize: 25, color: 'rgba(225, 0, 0, 1)' }}>
              {title ?? null}
            </Typography>
            <ErrorIcon color={'error'} />
          </Stack>
        );
      case MessageType.INFO:
        return (
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Typography sx={{ fontSize: 25, color: 'rgba(0, 80, 255, 1)' }}>
              {title ?? null}
            </Typography>
            <InfoIcon color={'primary'} />
          </Stack>
        );
      case MessageType.SUCCESS:
        return (
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Typography sx={{ fontSize: 25, color: 'rgba(0, 225, 0, 1)' }}>
              {title ?? null}
            </Typography>
            <CheckCircleIcon color={'primary'} />
          </Stack>
        );
    }
  }, [messageType, title]);

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
          <Stack alignItems={'center'}>{messageElement}</Stack>
        </DialogContent>

        <Divider />

        <DialogActions sx={{ justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
          <Stack direction={'row'} alignItems={'center'} spacing={10}>
            <FloatButton
              label={
                <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {confirmText ?? 'Ok'}
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
    [cancelButton, confirmText, handleCancelClick, handleConfirmClick, dialogHeader, messageElement]
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
