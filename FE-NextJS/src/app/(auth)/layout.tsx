import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Grid2 from '@mui/material/Grid2';
import { AuthHeaderProvider } from '@/common/contexts/AuthHeaderContext';
import AuthHeader from '@/components/header/AuthHeader';
import { memo, ReactNode } from 'react';
import AuthProvider from '@/common/provider/AuthProvider';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <AuthHeaderProvider>
        <Grid2 container direction={'column'} sx={authStyles.rootContainer}>
          <Card elevation={5} sx={{ width: 700, maxWidth: 700 }}>
            <AuthHeader />
            <Divider />
            {children}
          </Card>
        </Grid2>
      </AuthHeaderProvider>
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
