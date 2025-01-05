'use client';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { memo, useEffect } from 'react';

const Home = () => {
  useEffect(() => {}, []);

  return (
    <Container>
      <Typography>Home page</Typography>
    </Container>
  );
};

export default memo(Home);
