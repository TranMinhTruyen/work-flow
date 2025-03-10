import Box from '@mui/material/Box';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { useMemo } from 'react';

import { IRightSideDrawer } from '@/common/model/RightSideDrawer';
import { selectOpenSideDialog, toggleSideDialog } from '@/common/store/commonSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store';

const RightSideDrawer = () => {
  const openSideDialog: IRightSideDrawer = useAppSelector(selectOpenSideDialog);
  const dispatch = useAppDispatch();

  const drawerBody = useMemo(
    () => <Box sx={{ width: openSideDialog?.width ?? '80vw' }}></Box>,
    [openSideDialog?.width]
  );

  return openSideDialog?.isOnClose ? (
    <SideDrawer
      anchor={'right'}
      open={openSideDialog?.open}
      onClose={() => {
        dispatch(toggleSideDialog({ open: false, isOnClose: true }));
      }}
    >
      {drawerBody}
    </SideDrawer>
  ) : (
    <SideDrawer anchor={'right'} open={openSideDialog?.open}>
      {drawerBody}
    </SideDrawer>
  );
};

const SideDrawer = styled(Drawer)<DrawerProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export default RightSideDrawer;
