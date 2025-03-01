import { ExpandLess, ExpandMore } from '@mui/icons-material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Grid2 from '@mui/material/Grid2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/lib/store';
import { checkAccessScreen, handleCheckToken } from '@/common/utils/authUtil';
import {
  removeScreenExpand,
  selectOpenDrawer,
  selectScreenExpand,
  setScreenExpand,
  toggleDrawer,
} from '@/common/store/commonSlice';
import useRouter from '@/common/hooks/useRouter';

import screenItemList, { IScreenItem } from './ScreenListItem';

export type DrawerMenuItemProps = {
  childIndex?: number;
  item: IScreenItem;
};

const itemList = screenItemList;

const DrawerMenu = () => {
  const dispatch = useAppDispatch();
  const openDrawer = useAppSelector(selectOpenDrawer);

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

    for (const screen of itemList) {
      if (screen.screenChild == null) {
        if (checkAccessScreen(screen)) {
          returnItem.push(
            <Grid2 key={screen.screenKey} size={{ xs: 12 }}>
              <DrawerMenuItem item={screen} />
            </Grid2>
          );
        }
      } else {
        returnItem.push(
          <Grid2 key={screen.screenKey} size={{ xs: 12 }}>
            <DrawerMenuItemWithChild item={screen} />
          </Grid2>
        );
      }
    }
    return returnItem;
  }, []);

  return (
    <>
      <Grid2
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
      </Grid2>
      <Grid2
        container
        sx={{
          height: '40px',
          mt: 'auto',
        }}
      >
        <ListItemButton sx={{ padding: 0 }} onClick={handleDrawerOpen}>
          <ListItemIcon sx={{ justifyContent: 'center' }}>{openDrawerButton}</ListItemIcon>
          <ListItemText primary={'Collapse sidebar'} />
        </ListItemButton>
      </Grid2>
    </>
  );
};

const DrawerMenuItem = (props: DrawerMenuItemProps) => {
  const { item, childIndex } = props;
  const openDrawer = useAppSelector(selectOpenDrawer);
  const { navigate, currentPath } = useRouter();

  const handleOnClickItem = useCallback(
    (path: string) => async () => {
      await handleCheckToken();
      navigate(path);
    },
    [navigate]
  );

  const customListItemSx = {
    marginTop: childIndex && childIndex !== 0 ? 8 : 0,
    backgroundColor:
      currentPath === item.screenPath ? 'rgba(205, 205, 205, 0.8)' : 'rgba(255, 255, 255, 1)',
    color: currentPath === item.screenPath ? 'rgba(0, 109, 255, 0.8)' : 'rgba(98, 98, 98, 1)',
  };

  const customListItemButtonSx = { justifyContent: openDrawer ? 'initial' : 'center' };

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
    <Tooltip title={!openDrawer ? item.screenLabel : ''} placement={'right'} arrow>
      <Box>
        <CustomListItem
          style={customListItemSx}
          onClick={handleOnClickItem(item.screenPath)}
          disablePadding
        >
          <CustomListItemButton sx={customListItemButtonSx}>
            <CustomListItemIcon style={customListItemIconAndTextSx}>
              {itemCustomListItemIcon}
            </CustomListItemIcon>
            <ListItemText
              primary={item.screenLabel}
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
  const [openChild, setOpenChild] = useState<boolean>(false);
  const [hoverItem, setHoverItem] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const screenExpand = useAppSelector(selectScreenExpand);
  const openDrawer = useAppSelector(selectOpenDrawer);

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
      if (childScreen.screenChild == null) {
        if (checkAccessScreen(childScreen)) {
          returnItem.push(
            <DrawerMenuItem
              key={childScreen.screenKey}
              item={childScreen}
              childIndex={item.screenChild?.indexOf(childScreen)}
            />
          );
        }
      } else {
        returnItem.push(<DrawerMenuItemWithChild key={childScreen.screenKey} item={childScreen} />);
      }
    }

    return returnItem;
  }, [item.screenChild]);

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
          <Tooltip title={!openDrawer ? item.screenLabel : ''} placement={'right'} arrow>
            <CustomListItem onClick={handleExpand} disablePadding>
              <CustomListItemButton
                sx={customListItemButtonSx}
                onMouseEnter={() => setHoverItem(true)}
                onMouseLeave={() => setHoverItem(false)}
              >
                <CustomListItemIcon>{openDrawerButton}</CustomListItemIcon>
                <ListItemText primary={item.screenLabel} sx={listItemTextSx} />
                {expandButton}
              </CustomListItemButton>
            </CustomListItem>
          </Tooltip>

          <Collapse in={openChild} unmountOnExit>
            <Divider style={{ marginTop: '8px' }} />
            <List
              component={'div'}
              style={{
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
