import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
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
      <Stack direction={'row'}>
        <Stack sx={{ flex: 1, marginLeft: '30px' }}>
          <Typography variant={'h5'}>ADD NEW SCREEN</Typography>
        </Stack>
        <Stack>
          <IconButton
            width={30}
            height={30}
            onClick={closeDrawer}
            icon={<CloseIcon sx={{ color: 'rgba(0, 0, 0, 1)' }} />}
          />
        </Stack>
      </Stack>
      <Stack>{drawerBody}</Stack>
    </SideDrawer>
  ) : (
    <SideDrawer anchor={'right'} open={isOpen}>
      <Stack direction={'row'}>
        <Stack sx={{ flex: 1, marginLeft: '30px' }}>
          <Typography variant={'h5'}>ADD NEW SCREEN</Typography>
        </Stack>
        <Stack>
          <IconButton
            width={30}
            height={30}
            onClick={closeDrawer}
            icon={<CloseIcon sx={{ color: 'rgba(0, 0, 0, 1)' }} />}
          />
        </Stack>
      </Stack>
      <Stack>{drawerBody}</Stack>
    </SideDrawer>
  );
};

const SideDrawer = styled(Drawer)<DrawerProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export default RightDrawer;
