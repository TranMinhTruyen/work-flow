import { Backdrop as MuiBackdrop } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { memo, ReactElement, ReactNode, Suspense } from 'react';

const Backdrop = ({ children }: { children: ReactElement | ReactNode }) => {
  return (
    <Suspense
      fallback={
        <MuiBackdrop open={true}>
          <CircularProgress color="inherit" />
        </MuiBackdrop>
      }
    >
      {children}
    </Suspense>
  );
};

export default memo(Backdrop);
