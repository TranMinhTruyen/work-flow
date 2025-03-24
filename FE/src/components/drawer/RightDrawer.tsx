import CloseIcon from '@mui/icons-material/Close';
import { Divider, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useMemo } from 'react';

import { useRightDrawer } from '@/common/context/types/rightDrawerTypes';

const RightDrawer = () => {
  const { isOpen, content, closeDrawer } = useRightDrawer();

  const drawerBody = useMemo(
    () => <Box sx={{ width: content?.width ?? '50vw' }}>{content?.content}</Box>,
    [content?.content, content?.width]
  );

  return content?.isOnClose ? (
    <SideDrawer anchor={'right'} open={isOpen} onClose={closeDrawer}>
      <Stack direction={'row'} sx={{ padding: '8px' }}>
        <Stack sx={{ flex: 1, marginLeft: '30px' }}>{content?.title}</Stack>

        <IconButton sx={{ width: '30px', height: '30px' }} onClick={closeDrawer} color={'primary'}>
          <CloseIcon fontSize={'medium'} />
        </IconButton>
      </Stack>

      <Divider />

      <Stack sx={{ padding: '16px' }}>{drawerBody}</Stack>
    </SideDrawer>
  ) : (
    <SideDrawer anchor={'right'} open={isOpen}>
      <Stack direction={'row'} sx={{ padding: '8px' }}>
        <Stack sx={{ flex: 1, marginLeft: '30px' }}>{content?.title}</Stack>

        <IconButton sx={{ width: '30px', height: '30px' }} onClick={closeDrawer} color={'primary'}>
          <CloseIcon fontSize={'medium'} />
        </IconButton>
      </Stack>

      <Divider />

      <Stack sx={{ padding: '16px' }}>{drawerBody}</Stack>
    </SideDrawer>
  );
};

const SideDrawer = styled(Drawer)<DrawerProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export default RightDrawer;
