'use client';
import { memo } from 'react';
import { Backdrop as MuiBackdrop } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <MuiBackdrop open={true}>
      <CircularProgress color={'inherit'} />
    </MuiBackdrop>
  );
};

export default memo(Loading);
