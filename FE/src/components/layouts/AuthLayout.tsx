import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Grid2 from '@mui/material/Grid2';
import authStyles from 'assets/styles/authStyles';
import { AuthHeaderProvider } from 'common/contexts/AuthHeaderContext';
import AuthHeader from 'components/header/AuthHeader';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const AuthLayout = () => {
  const location = useLocation();

  useEffect(() => {
    sessionStorage.setItem('currentPath', location.pathname);
  }, [location.pathname]);

  return (
    <AuthHeaderProvider>
      <Grid2 container direction={'column'} sx={authStyles.rootContainer}>
        <Card elevation={5} sx={{ width: 700, maxWidth: 700 }}>
          <AuthHeader />
          <Divider />
          <Outlet />
        </Card>
      </Grid2>
    </AuthHeaderProvider>
  );
};
export default AuthLayout;
