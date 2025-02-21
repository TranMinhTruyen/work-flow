'use client';
import AuthProvider from '@/common/provider/AuthProvider';
import AuthHeader from '@/components/header/auth-header/AuthHeader';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Grid2 from '@mui/material/Grid2';
import { memo, ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <Grid2 container direction={'column'} sx={authStyles.rootContainer}>
        <Card elevation={5} sx={{ width: 650, maxWidth: 650 }}>
          <AuthHeader />
          <Divider />
          {children}
        </Card>
      </Grid2>
    </AuthProvider>
  );
};

const authStyles = {
  rootContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
};

export default memo(AuthLayout);
