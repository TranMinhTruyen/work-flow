import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import { useRightDrawer } from '@/common/context/types/rightDrawerTypes';

import IconButton from '../button/IconButton';

const RightDrawer = () => {
  const { isOpen, content, closeDrawer } = useRightDrawer();
  const { t } = useTranslation();

  return content?.isOnClose ? (
    <Drawer anchor={'right'} open={isOpen} onClose={() => closeDrawer()}>
      <Stack
        sx={{ marginTop: '55px', maxHeight: 'calc(100vh - 55px)', width: content?.width ?? '50vw' }}
      >
        <Stack direction={'row'} sx={{ height: '45px', padding: '8px' }}>
          <IconButton
            width={30}
            height={30}
            onClick={() => closeDrawer()}
            color={'primary'}
            icon={<KeyboardArrowRightIcon />}
          />

          <Stack sx={{ flex: 1, height: '30px' }}>
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
    </Drawer>
  ) : (
    <Drawer anchor={'right'} open={isOpen}>
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
    </Drawer>
  );
};

export default RightDrawer;
