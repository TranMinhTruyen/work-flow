import Stack from '@mui/material/Stack';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import authStyles from 'assets/styles/main/AuthLayout';
import { AuthHeaderProvider } from 'common/contexts/AuthHeaderContext';
import AuthHeader from 'components/header/AuthHeader';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <AuthHeaderProvider>
      <Grid2 container direction={'column'} sx={authStyles.rootContainer}>
        <Stack spacing={1}>
          <AuthHeader />
          <Outlet />
        </Stack>
      </Grid2>
    </AuthHeaderProvider>
  );
};
export default AuthLayout;
