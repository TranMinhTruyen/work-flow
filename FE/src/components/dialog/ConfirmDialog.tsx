import { I18nEnum } from '@/common/enums/i18nEnum';
import { MessageType } from '@/common/enums/messageEnum';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactNode, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../button/Button';

export type ConfirmDialogProps = Omit<DialogProps, 'title'> & {
  bodyElement?: ReactNode;
  messageType?: MessageType;
  cancelText?: string;
  confirmText?: string;
  isPopup?: boolean;
  showCancelButton?: boolean;
  showCloseButton?: boolean;
  countdown?: number;
  /**
   * Auto close dialog after timeout
   * @default false
   */
  autoClose?: boolean;
  /**
   * Show countdown time
   * @default true
   */
  showCountdown?: boolean;
  /**
   * Countdown time
   * @default 10 second
   */
  timeout?: number;
  onConfirm?: () => void;
  onCancel?: () => void;
};

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const {
    open,
    bodyElement,
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
    timeout,
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
      case MessageType.SUCCESS:
        return (
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Typography variant={'h5'} sx={{ color: 'rgba(0, 225, 0, 1)' }}>
              {t(MessageType.SUCCESS)}
            </Typography>
            <CheckCircleIcon color={'primary'} />
          </Stack>
        );
      case MessageType.WARN:
        return (
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Typography variant={'h5'} sx={{ color: 'rgba(255, 200, 0, 1)' }}>
              {t(MessageType.WARN)}
            </Typography>
            <ErrorIcon color={'warning'} />
          </Stack>
        );
      case MessageType.ERROR:
        return (
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Typography variant={'h5'} sx={{ color: 'rgba(225, 0, 0, 1)' }}>
              {t(MessageType.ERROR)}
            </Typography>
            <ErrorIcon color={'error'} />
          </Stack>
        );
      default:
        return (
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Typography variant={'h5'} sx={{ color: 'rgba(0, 80, 255, 1)' }}>
              {t(MessageType.INFO)}
            </Typography>
            <InfoIcon color={'primary'} />
          </Stack>
        );
    }
  }, [messageType, t]);

  const body = useMemo(() => {
    if (bodyElement) {
      if (typeof bodyElement === 'string') {
        return <Typography sx={{ fontSize: 20 }}>{bodyElement}</Typography>;
      } else {
        return bodyElement;
      }
    } else {
      return null;
    }
  }, [bodyElement]);

  const cancelButton = useMemo(() => {
    if (showCancelButton !== undefined && showCancelButton) {
      return (
        <Button
          label={
            <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
              {cancelText ?? t('button.cancel')}
            </Typography>
          }
          sx={{
            width: 120,
            height: 30,
            backgroundColor: 'rgba(255, 50, 50, 0.8)',
          }}
          onClick={handleCancelClick}
        />
      );
    }
  }, [cancelText, handleCancelClick, showCancelButton, t]);

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
            {body}
            {showCountdown && autoClose && countdown && timeout ? (
              <>
                <Box sx={{ marginTop: '18px', position: 'relative', display: 'inline-flex' }}>
                  <CircularProgress variant={'determinate'} value={(countdown / timeout) * 100} />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      sx={{ color: 'text.secondary' }}
                    >{`${Math.round(countdown)}s`}</Typography>
                  </Box>
                </Box>
              </>
            ) : null}
          </Stack>
        </DialogContent>

        <Divider />

        <DialogActions sx={{ justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
          <Stack direction={'row'} alignItems={'center'} spacing={10}>
            <Button
              label={
                <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {confirmText ?? t('button.ok')}
                </Typography>
              }
              sx={{
                width: 120,
                height: 30,
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
      body,
      showCountdown,
      autoClose,
      countdown,
      timeout,
      confirmText,
      t,
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
