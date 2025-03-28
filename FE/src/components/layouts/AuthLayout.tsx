import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { memo } from 'react';
import { Outlet } from 'react-router-dom';

import AuthHeader from '../header/auth-header/AuthHeader';

const AuthLayout = () => {
  return (
    <Grid container direction={'column'} sx={authStyles.rootContainer}>
      <Card elevation={5} sx={{ width: 650, maxWidth: 650, minHeight: 445 }}>
        <AuthHeader />
        <Divider />
        <Outlet />
      </Card>
    </Grid>
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
