import { ExpandLess, ExpandMore } from '@mui/icons-material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { I18nEnum } from '@/common/enums/i18nEnum';
import useRouter from '@/common/hooks/useRouter';
import {
  removeScreenExpand,
  selectLoginData,
  selectOpenDrawer,
  selectScreenExpand,
  selectScreenMaster,
  setScreenExpand,
  toggleDrawer,
} from '@/common/store/commonSlice';
import { checkAccessScreen, handleCheckToken } from '@/common/utils/authUtil';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import screenItemList, { IScreenItem } from './ScreenListItem';

export type DrawerMenuItemProps = {
  item: IScreenItem;
};

const DrawerMenu = () => {
  const { currentPath } = useRouter();
  const dispatch = useAppDispatch();
  const openDrawer = useAppSelector(selectOpenDrawer);
  const screenExpand = useAppSelector(selectScreenExpand);
  const screenExpandChain = useRef<string[]>([]);
  const loginData = useAppSelector(selectLoginData);
  const screenMasterList = useAppSelector(selectScreenMaster);

  const findChain = useCallback(
    (items: IScreenItem[], chain: string[] = []): boolean => {
      for (const item of items) {
        const newChain = [...chain, item.screenKey];
        if (item.screenPath === currentPath) {
          screenExpandChain.current = newChain;
          return true;
        }
        if (item.screenChild) {
          if (findChain(item.screenChild, newChain)) {
            return true;
          }
        }
      }
      return false;
    },
    [currentPath]
  );

  useEffect(() => {
    findChain(screenItemList);
    const newScreenExpandChain = screenExpandChain.current.slice(
      0,
      screenExpandChain.current.length - 1
    );
    for (const item of newScreenExpandChain) {
      if (!screenExpand.find(x => x === item)) {
        dispatch(setScreenExpand(item));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath]);

  const handleDrawerOpen = useCallback(() => {
    dispatch(toggleDrawer());
  }, [dispatch]);

  const openDrawerButton = useMemo(
    () =>
      !openDrawer ? (
        <KeyboardArrowRightIcon fontSize={'large'} />
      ) : (
        <KeyboardArrowLeftIcon fontSize={'large'} />
      ),
    [openDrawer]
  );

  const drawerItemList = useMemo(() => {
    const returnItem: ReactNode[] = [];

    if (screenItemList.length === 0) {
      return returnItem;
    }

    for (const screen of screenItemList) {
      if (screen.screenChild === null) {
        if (checkAccessScreen(screen, loginData, screenMasterList)) {
          returnItem.push(
            <Grid key={screen.screenKey} size={{ xs: 12 }}>
              <DrawerMenuItem item={screen} />
            </Grid>
          );
        }
      } else {
        returnItem.push(
          <Grid key={screen.screenKey} size={{ xs: 12 }}>
            <DrawerMenuItemWithChild item={screen} />
          </Grid>
        );
      }
    }
    return returnItem;
  }, [loginData, screenMasterList]);

  return (
    <>
      <Grid
        key={'drawer-menu'}
        container
        sx={{
          padding: 1,
          overflowX: 'hidden',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        spacing={1}
      >
        {drawerItemList}
      </Grid>
      <Grid
        container
        sx={{
          height: '40px',
          mt: 'auto',
        }}
      >
        <ListItemButton sx={{ padding: 0 }} onClick={handleDrawerOpen}>
          <ListItemIcon sx={{ justifyContent: 'center' }}>{openDrawerButton}</ListItemIcon>
          <ListItemText
            sx={{ marginTop: '2px', marginBottom: 0 }}
            primary={<Typography>Collapse sidebar</Typography>}
          />
        </ListItemButton>
      </Grid>
    </>
  );
};

const DrawerMenuItem = (props: DrawerMenuItemProps) => {
  const { item } = props;
  const { navigate, currentPath } = useRouter();
  const { t } = useTranslation(I18nEnum.COMMON_I18N);

  const openDrawer = useAppSelector(selectOpenDrawer);

  const handleOnClickItem = useCallback(
    (path: string) => () => {
      handleCheckToken();
      navigate(path);
    },
    [navigate]
  );

  const customListItemSx = {
    backgroundColor:
      currentPath === item.screenPath ? 'rgba(205, 205, 205, 0.8)' : 'rgba(255, 255, 255, 1)',
    color: currentPath === item.screenPath ? 'rgba(0, 109, 255, 0.8)' : 'rgba(98, 98, 98, 1)',
  };

  const customListItemButtonSx = { justifyContent: openDrawer ? 'initial' : 'center', gap: '8px' };

  const customListItemIconAndTextSx =
    currentPath === item.screenPath
      ? { color: 'rgba(0, 109, 255, 0.8)' }
      : { color: 'rgba(98, 98, 98, 1)' };

  const listItemTextSx = { opacity: openDrawer ? 1 : 0, color: 'rgba(98, 98, 98, 1)' };

  const itemCustomListItemIcon = useMemo(
    () => <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>{item.screenIcon}</Stack>,
    [item.screenIcon]
  );

  return (
    <Tooltip title={!openDrawer ? t(item.screenLabel) : ''} placement={'right'} arrow>
      <Box>
        <CustomListItem
          style={customListItemSx}
          onClick={handleOnClickItem(item.screenPath)}
          disablePadding
        >
          <CustomListItemButton sx={customListItemButtonSx}>
            <CustomListItemIcon
              style={customListItemIconAndTextSx}
              sx={{ marginLeft: openDrawer ? '0px' : '8px' }}
            >
              {itemCustomListItemIcon}
            </CustomListItemIcon>
            <ListItemText
              primary={t(item.screenLabel)}
              style={customListItemIconAndTextSx}
              sx={listItemTextSx}
            />
          </CustomListItemButton>
        </CustomListItem>
      </Box>
    </Tooltip>
  );
};

const DrawerMenuItemWithChild = (props: DrawerMenuItemProps) => {
  const { item } = props;
  const { t } = useTranslation(I18nEnum.COMMON_I18N);
  const [openChild, setOpenChild] = useState<boolean>(false);
  const [hoverItem, setHoverItem] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const screenExpand = useAppSelector(selectScreenExpand);
  const openDrawer = useAppSelector(selectOpenDrawer);
  const loginData = useAppSelector(selectLoginData);
  const screenMasterList = useAppSelector(selectScreenMaster);

  useEffect(() => {
    if (screenExpand.includes('ALL') || screenExpand.find(x => x === item.screenKey)) {
      setOpenChild(true);
    }
  }, [item.screenKey, screenExpand]);

  const expandButton = useMemo(
    () =>
      openDrawer ? (
        openChild ? (
          <ExpandMore sx={{ color: 'rgba(98, 98, 98, 1)' }} />
        ) : (
          <KeyboardArrowRightIcon sx={{ color: 'rgba(98, 98, 98, 1)' }} />
        )
      ) : undefined,
    [openChild, openDrawer]
  );

  const itemCustomListItemIcon: ReactNode = useMemo(
    () => <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>{item.screenIcon}</Stack>,
    [item.screenIcon]
  );

  const openDrawerButton: ReactNode = useMemo(() => {
    if (!openDrawer && openChild && !hoverItem) {
      return itemCustomListItemIcon;
    }

    if (!openDrawer && openChild && hoverItem) {
      return <ExpandLess fontSize={'large'} />;
    }

    if (!openDrawer && !openChild && hoverItem) {
      return <ExpandMore fontSize={'large'} />;
    }

    if (!openDrawer && !openChild && !hoverItem) {
      return itemCustomListItemIcon;
    }

    return itemCustomListItemIcon;
  }, [hoverItem, itemCustomListItemIcon, openChild, openDrawer]);

  const childItem: ReactNode[] = useMemo(() => {
    const returnItem: ReactNode[] = [];

    if (item.screenChild === undefined || item.screenChild === null) {
      return returnItem;
    }

    for (const childScreen of item.screenChild) {
      if (childScreen.screenChild === null) {
        if (checkAccessScreen(childScreen, loginData, screenMasterList)) {
          returnItem.push(<DrawerMenuItem key={childScreen.screenKey} item={childScreen} />);
        }
      } else {
        returnItem.push(<DrawerMenuItemWithChild key={childScreen.screenKey} item={childScreen} />);
      }
    }

    return returnItem;
  }, [item.screenChild, loginData, screenMasterList]);

  const handleExpand = useCallback(() => {
    setOpenChild(!openChild);
    if (!openChild) {
      dispatch(setScreenExpand(item.screenKey));
    } else {
      dispatch(removeScreenExpand(item.screenKey));
    }
  }, [dispatch, item.screenKey, openChild]);

  const childItemCollapse = useMemo(() => {
    if (childItem.length > 0) {
      const customListItemButtonSx = { justifyContent: openDrawer ? 'initial' : 'center' };

      const listItemTextSx = { opacity: openDrawer ? 1 : 0, color: 'rgba(98, 98, 98, 1)' };

      return (
        <>
          <Tooltip title={!openDrawer ? t(item.screenLabel) : ''} placement={'right'} arrow>
            <CustomListItem onClick={handleExpand} disablePadding>
              <CustomListItemButton
                sx={customListItemButtonSx}
                onMouseEnter={() => setHoverItem(true)}
                onMouseLeave={() => setHoverItem(false)}
              >
                <CustomListItemIcon>{openDrawerButton}</CustomListItemIcon>
                <ListItemText primary={t(item.screenLabel)} sx={listItemTextSx} />
                {expandButton}
              </CustomListItemButton>
            </CustomListItem>
          </Tooltip>

          <Collapse in={openChild} unmountOnExit>
            <Divider style={{ marginTop: '8px' }} />
            <List
              component={'div'}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginLeft: openDrawer ? '8px' : '0px',
                paddingTop: '8px',
                paddingBottom: '8px',
              }}
            >
              {childItem}
            </List>
            <Divider />
          </Collapse>
        </>
      );
    }
  }, [
    childItem,
    expandButton,
    handleExpand,
    item.screenLabel,
    openChild,
    openDrawer,
    openDrawerButton,
    t,
  ]);

  return <Box>{childItemCollapse}</Box>;
};

export const CustomListItem = styled(ListItem)({
  borderRadius: 25,
  padding: 0,
});

export const CustomListItemButton = styled(ListItemButton)({
  height: '40px !important',
  padding: 0,
  justifyContent: 'center',
  borderRadius: 25,
  '& .MuiListItemIcon-root': {
    minWidth: '40px',
  },
  '&:hover': {
    backgroundColor: 'rgba(217, 216, 216, 1)',
  },
  '&:active': {
    boxShadow: 'rgba(168, 168, 168, 1)',
    color: 'rgba(0, 0, 0, 1)',
  },
});

export const CustomListItemIcon = styled(ListItemIcon)({
  justifyContent: 'center',
  color: 'rgba(98, 98, 98, 1)',
});

export default DrawerMenu;
