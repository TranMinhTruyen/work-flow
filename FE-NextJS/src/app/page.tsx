import { memo } from 'react';
import { Backdrop as MuiBackdrop } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const App = () => {
  return (
    <MuiBackdrop open={true}>
      <CircularProgress color="inherit" />
    </MuiBackdrop>
  );
};

export default memo(App);
