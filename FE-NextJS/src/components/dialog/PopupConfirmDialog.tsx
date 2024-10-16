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
import { MessageType } from '@/common/enums/messageEnums';
import FloatButton from '../button/FloatButton';

export type PopupConfirmDialogProps = DialogProps & {
  title?: ReactNode;
  message?: ReactNode;
  messageType?: MessageType;
  cancelText?: string;
  confirmText?: string;
  showCancelButton?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
};

const PopupConfirmDialog = (props: PopupConfirmDialogProps) => {
  const {
    open,
    title,
    message,
    messageType,
    cancelText,
    confirmText,
    showCancelButton,
    onConfirm,
    onCancel,
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

  return (
    <Dialog
      keepMounted
      open={open}
      fullWidth={true}
      maxWidth={'xs'}
      onClose={handleCancelClick}
      {...restProps}
    >
      <Box sx={{ padding: '10px' }}>
        <Stack alignItems={'center'} justifyContent={'center'} direction={'row'} spacing={1}>
          <Typography sx={{ fontSize: 25 }}>{title ?? null}</Typography>
          {icon}
        </Stack>
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
    </Dialog>
  );
};

export default PopupConfirmDialog;
