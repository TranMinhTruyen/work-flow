import Box from '@mui/material/Box';
import { CustomLoadingOverlayProps } from 'ag-grid-react';

import CircleProgress from '@/components/loading/CircleProgress';

const CustomLoading = (props: CustomLoadingOverlayProps) => {
  return (
    <Box className={'ag-overlay-loading-center'} role={'presentation'}>
      <CircleProgress />
    </Box>
  );
};

export default CustomLoading;
