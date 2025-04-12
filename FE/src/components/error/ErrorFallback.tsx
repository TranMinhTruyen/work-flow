import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import { I18nEnum } from '@/common/enums/i18nEnum';
import useWebSocket from '@/common/hooks/useWebSocket';
import { updateScreenStatus } from '@/common/store/commonSlice';
import { useAppDispatch } from '@/lib/store';
import ISaveScreenResponse from '@/pages/main-page/settings/screen/model/response/SaveScreenResponse';

import Button from '../button/Button';

type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

const ErrorFallback = (props: ErrorFallbackProps) => {
  const { error, resetErrorBoundary } = props;
  const { t } = useTranslation(I18nEnum.COMMON_I18N);
  const dispatch = useAppDispatch();

  // Check status screen via websocket.
  useWebSocket<ISaveScreenResponse>({
    receiveUrl: '/screen-master/change',
    onSubscribe: (data: ISaveScreenResponse) => {
      if (data) {
        dispatch(
          updateScreenStatus({
            screenId: data.screenId,
            active: data.active,
          })
        );
      }
    },
  });

  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack spacing={2}>
        <Typography variant={'h3'}>{t(`clientError.${error.message}`)}</Typography>
        <Button label={'Reset'} sx={styles.button} onClick={resetErrorBoundary} />
      </Stack>
    </Container>
  );
};

const styles = {
  button: {
    minWidth: '125px',
    backgroundColor: 'rgba(0, 170, 255, 0.8)',
    height: '30px',
  },
};

export default ErrorFallback;
