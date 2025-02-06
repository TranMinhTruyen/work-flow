'use client';
import { HTMLElement } from '@/common/constants/typeConst';
import useNavigate from '@/common/hooks/useNavigate';
import { selectOpenDrawer } from '@/common/store/commonSlice';
import { checkAccessScreen } from '@/common/utils/authUtil';
import { useAppSelector } from '@/lib/store';
import { ExpandMore } from '@mui/icons-material';
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
import { useCallback, useMemo, useState } from 'react';
import DrawerItemList, { DrawerItem } from './DrawerListItem';

const itemList = DrawerItemList;

export type DrawerMenuItemProps = {
  childIndex?: number;
  item: DrawerItem;
};

const DrawerMenu = () => {
  // const loginData = useAppSelector(selectLoginData);

  const drawerItemList = useMemo(() => {
    const returnItem: HTMLElement[] = [];

    if (itemList.length === 0) {
      return returnItem;
    }

    for (const screen of itemList) {
      if (!checkAccessScreen(screen)) {
        continue;
      } else if (screen.screenChild == null) {
        returnItem.push(
          <Grid2 key={screen.screenKey} size={{ xs: 12 }}>
            <DrawerMenuItem item={screen} />
          </Grid2>
        );
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
    <Grid2 key={'drawer-menu'} container sx={{ padding: 1 }} spacing={1}>
      {drawerItemList}
    </Grid2>
  );
};

const DrawerMenuItem = (props: DrawerMenuItemProps) => {
  const { item, childIndex } = props;
  const openDrawer = useAppSelector(selectOpenDrawer);
  const { navigate, currentPath } = useNavigate();

  const handleOnClickItem = useCallback(
    (path: string) => () => {
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
  const openDrawer = useAppSelector(selectOpenDrawer);
  // const loginData = useAppSelector(selectLoginData);

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

  const itemCustomListItemIcon = useMemo(
    () => <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>{item.screenIcon}</Stack>,
    [item.screenIcon]
  );

  const childItem: HTMLElement[] = useMemo(() => {
    const returnItem: HTMLElement[] = [];

    if (item.screenChild === undefined || item.screenChild === null) {
      return returnItem;
    }

    for (const componentChildItem of item.screenChild) {
      if (componentChildItem.screenRole !== null) {
        continue;
      } else if (componentChildItem.screenChild == null) {
        returnItem.push(
          <DrawerMenuItem
            key={componentChildItem.screenKey}
            item={componentChildItem}
            childIndex={item.screenChild?.indexOf(componentChildItem)}
          />
        );
      } else {
        returnItem.push(
          <DrawerMenuItemWithChild key={componentChildItem.screenKey} item={componentChildItem} />
        );
      }
    }

    return returnItem;
  }, [item.screenChild]);

  const childItemCollapse = useMemo(() => {
    if (childItem.length > 0) {
      const handleExpand = () => {
        setOpenChild(!openChild);
      };

      const customListItemButtonSx = { justifyContent: openDrawer ? 'initial' : 'center' };

      const listItemTextSx = { opacity: openDrawer ? 1 : 0, color: 'rgba(98, 98, 98, 1)' };

      return (
        <>
          <Tooltip title={!openDrawer ? item.screenLabel : ''} placement={'right'} arrow>
            <CustomListItem onClick={handleExpand} disablePadding>
              <CustomListItemButton sx={customListItemButtonSx}>
                <CustomListItemIcon>{itemCustomListItemIcon}</CustomListItemIcon>
                <ListItemText primary={item.screenLabel} sx={listItemTextSx} />
                {expandButton}
              </CustomListItemButton>
            </CustomListItem>
          </Tooltip>

          <Collapse in={openChild} unmountOnExit>
            <Divider style={{ marginTop: 8 }} />
            <List
              component={'div'}
              style={{
                marginLeft: openDrawer ? 20 : 0,
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              {childItem}
            </List>
            <Divider />
          </Collapse>
        </>
      );
    }
  }, [childItem, expandButton, item.screenLabel, itemCustomListItemIcon, openChild, openDrawer]);

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
