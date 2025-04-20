import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import { useRightDrawer } from '@/common/context/types/rightDrawerTypes';

import IconButton from '../button/IconButton';

const RightDrawer = () => {
  const { isOpen, content, closeDrawer } = useRightDrawer();
  const { t } = useTranslation();

  return content?.isOnClose ? (
    <SideDrawer anchor={'right'} open={isOpen} onClose={() => closeDrawer()}>
      <Stack
        sx={{ marginTop: '55px', maxHeight: 'calc(100vh - 55px)', width: content?.width ?? '50vw' }}
      >
        <Stack direction={'row'} sx={{ height: '45px', padding: '8px' }}>
          <Stack sx={{ flex: 1, height: '30px', marginLeft: '30px' }}>
            <Typography variant={'h5'}>{t(content?.title ?? '')}</Typography>
          </Stack>

          <IconButton
            width={30}
            height={30}
            onClick={() => closeDrawer()}
            color={'primary'}
            icon={<CloseIcon />}
          />
        </Stack>

        <Divider />

        {content?.content}
      </Stack>
    </SideDrawer>
  ) : (
    <SideDrawer anchor={'right'} open={isOpen}>
      <Stack
        sx={{ marginTop: '55px', maxHeight: 'calc(100vh - 55px)', width: content?.width ?? '50vw' }}
      >
        <Stack direction={'row'} sx={{ height: '45px', padding: '8px' }}>
          <Stack sx={{ flex: 1, marginLeft: '30px' }}>{content?.title}</Stack>

          <IconButton
            width={30}
            height={30}
            onClick={() => closeDrawer()}
            color={'primary'}
            icon={<CloseIcon />}
          />
        </Stack>

        <Divider />

        {content?.content}
      </Stack>
    </SideDrawer>
  );
};

const SideDrawer = styled(Drawer)<DrawerProps>(({ theme }) => ({
  // zIndex: theme.zIndex.drawer + 1,
}));

export default RightDrawer;
