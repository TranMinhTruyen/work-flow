'use client';
import { memo, useEffect } from 'react';
import { Backdrop as MuiBackdrop } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/navigation';

const RootPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/home');
  }, [router]);

  return (
    <MuiBackdrop open={true}>
      <CircularProgress color="inherit" />
    </MuiBackdrop>
  );
};

export default memo(RootPage);
