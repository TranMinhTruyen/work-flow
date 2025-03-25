import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useMemo } from 'react';

import { useRightDrawer } from '@/common/context/types/rightDrawerTypes';

import IconButton from '../button/IconButton';

const RightDrawer = () => {
  const { isOpen, content, closeDrawer } = useRightDrawer();

  const drawerBody = useMemo(
    () => <Box sx={{ width: content?.width ?? '50vw' }}>{content?.content}</Box>,
    [content?.content, content?.width]
  );

  return content?.isOnClose ? (
    <SideDrawer anchor={'right'} open={isOpen} onClose={closeDrawer}>
      <Stack direction={'row'} sx={{ height: '45px', padding: '8px' }}>
        <Stack sx={{ flex: 1, height: '30px', marginLeft: '30px' }}>{content?.title}</Stack>

        <IconButton
          width={30}
          height={30}
          onClick={closeDrawer}
          color={'primary'}
          icon={<CloseIcon />}
        />
      </Stack>

      <Divider />

      <Stack sx={{ padding: '16px' }}>{drawerBody}</Stack>
    </SideDrawer>
  ) : (
    <SideDrawer anchor={'right'} open={isOpen}>
      <Stack direction={'row'} sx={{ height: '45px', padding: '8px' }}>
        <Stack sx={{ flex: 1, marginLeft: '30px' }}>{content?.title}</Stack>

        <IconButton
          width={30}
          height={30}
          onClick={closeDrawer}
          color={'primary'}
          icon={<CloseIcon />}
        />
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
