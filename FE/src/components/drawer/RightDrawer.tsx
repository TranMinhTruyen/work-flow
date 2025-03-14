import Box from '@mui/material/Box';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { useMemo } from 'react';

import { useRightDrawer } from '@/common/context/RightDrawerContext';

const RightDrawer = () => {
  const { isOpen, content, closeDrawer } = useRightDrawer();

  const drawerBody = useMemo(
    () => <Box sx={{ width: content?.width ?? '50vw' }}></Box>,
    [content?.width]
  );

  return content?.isOnClose ? (
    <SideDrawer anchor={'right'} open={isOpen} onClose={closeDrawer}>
      {drawerBody}
    </SideDrawer>
  ) : (
    <SideDrawer anchor={'right'} open={isOpen}>
      {drawerBody}
    </SideDrawer>
  );
};

const SideDrawer = styled(Drawer)<DrawerProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export default RightDrawer;
