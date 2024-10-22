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

export type PopupConfirmDialogProps = DialogProps & {
  title?: ReactNode;
  message?: ReactNode;
  messageType?: MessageType;
  cancelText?: string;
  confirmText?: string;
  isPopup?: boolean;
  showCancelButton?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
};

const ConfirmDialog = (props: PopupConfirmDialogProps) => {
  const {
    open,
    title,
    message,
    messageType,
    cancelText,
    confirmText,
    showCancelButton,
    isPopup = true,
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

  const icon = useMemo(() => {
    switch (messageType) {
      case MessageType.WARN:
        return <ErrorIcon color="warning" />;
      case MessageType.ERROR:
        return <ErrorIcon color="error" />;
      case MessageType.INFO:
        return <InfoIcon color="primary" />;
      case MessageType.SUCCESS:
        return <CheckCircleIcon color="primary" />;
    }
  }, [messageType]);

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
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Typography sx={{ fontSize: 25 }}>{title ?? null}</Typography>
            {icon}
          </Stack>

          <IconButton onClick={handleCancelClick} sx={{ position: 'absolute', right: 8 }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        <DialogContent sx={{ padding: 3.5 }}>
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
    [cancelButton, confirmText, handleCancelClick, handleConfirmClick, icon, messageElement, title]
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
