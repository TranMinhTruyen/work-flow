import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import authStyles from 'assets/styles/main/AuthLayout';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <Box>
      <Container sx={authStyles.rootContainer}>
        <Outlet />
      </Container>
    </Box>
  );
};
export default AuthLayout;
