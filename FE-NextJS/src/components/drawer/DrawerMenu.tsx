'use client';
import { useCallback, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import DrawerItemList, { DrawerItem } from './DrawerListItem';
import { ExpandMore } from '@mui/icons-material';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import Grid2 from '@mui/material/Grid2';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useAppSelector } from '@/lib/store';
import { selectOpenDrawer } from '@/lib/slices/commonSlice';
import useNavigate from '@/common/hooks/useNavigate';

const itemList = DrawerItemList;

export interface IDrawerMenuItemProps {
  isChild?: boolean;
  childIndex?: number;
  item: DrawerItem;
}

const DrawerMenu = () => {
  // const loginData = useAppSelector(selectLoginData);

  const drawerItemList = useMemo(() => {
    const returnItem: JSX.Element[] = [];

    if (itemList.length === 0) {
      return returnItem;
    }

    for (const componentItem of itemList) {
      if (componentItem.componentRole !== null) {
        continue;
      } else if (componentItem.componentChild == null) {
        returnItem.push(
          <Grid2 key={componentItem.componentKey} size={{ xs: 12 }}>
            <DrawerMenuItem item={componentItem} />
          </Grid2>
        );
      } else {
        returnItem.push(
          <Grid2 key={componentItem.componentKey} size={{ xs: 12 }}>
            <DrawerMenuItemWithChild item={componentItem} />
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

const DrawerMenuItem = ({ item, isChild = false, childIndex }: IDrawerMenuItemProps) => {
  const openDrawer = useAppSelector(selectOpenDrawer);
  const { navigate, currentPath } = useNavigate();

  const handleOnClickItem = useCallback(
    (path: string) => () => {
      navigate(path);
    },
    [navigate]
  );

  const customListItemSx = {
    marginTop: isChild && childIndex !== 0 ? 8 : 0,
    backgroundColor: currentPath === item.componentPath ? 'rgba(205, 205, 205, 0.8)' : '#ffffff',
    color: currentPath === item.componentPath ? 'rgba(0, 109, 255, 0.8)' : 'rgba(98, 98, 98)',
  };

  const customListItemButtonSx = { justifyContent: openDrawer ? 'initial' : 'center' };

  const customListItemIconAndTextSx =
    currentPath === item.componentPath
      ? { color: 'rgba(0, 109, 255, 0.8)' }
      : { color: 'rgba(98, 98, 98)' };

  const listItemTextSx = { opacity: openDrawer ? 1 : 0, color: 'rgba(98, 98, 98)' };

  const itemCustomListItemIcon = useMemo(
    () => (
      <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>{item.componentIcon}</Stack>
    ),
    [item.componentIcon]
  );

  return (
    <Tooltip
      TransitionComponent={Zoom}
      title={!openDrawer ? item.componentLabel : ''}
      placement={'right'}
      arrow
    >
      <Box>
        <CustomListItem
          style={customListItemSx}
          onClick={handleOnClickItem(item.componentPath)}
          disablePadding
        >
          <CustomListItemButton sx={customListItemButtonSx}>
            <CustomListItemIcon style={customListItemIconAndTextSx}>
              {itemCustomListItemIcon}
            </CustomListItemIcon>
            <ListItemText
              primary={item.componentLabel}
              style={customListItemIconAndTextSx}
              sx={listItemTextSx}
            />
          </CustomListItemButton>
        </CustomListItem>
      </Box>
    </Tooltip>
  );
};

const DrawerMenuItemWithChild = ({ item }: IDrawerMenuItemProps) => {
  const [openChild, setOpenChild] = useState<boolean>(false);
  const openDrawer = useAppSelector(selectOpenDrawer);
  // const loginData = useAppSelector(selectLoginData);

  const expandButton = useMemo(
    () =>
      openDrawer ? (
        openChild ? (
          <ExpandMore sx={{ color: 'rgba(98, 98, 98)' }} />
        ) : (
          <KeyboardArrowRightIcon sx={{ color: 'rgba(98, 98, 98)' }} />
        )
      ) : (
        <></>
      ),
    [openChild, openDrawer]
  );

  const itemCustomListItemIcon = useMemo(
    () => (
      <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>{item.componentIcon}</Stack>
    ),
    [item.componentIcon]
  );

  const childItem = useMemo(() => {
    const returnItem: JSX.Element[] = [];

    if (item.componentChild === undefined || item.componentChild === null) {
      return returnItem;
    }

    for (const componentChildItem of item.componentChild) {
      if (componentChildItem.componentRole !== null) {
        continue;
      } else if (componentChildItem.componentChild == null) {
        returnItem.push(
          <DrawerMenuItem
            key={componentChildItem.componentKey}
            item={componentChildItem}
            childIndex={item.componentChild?.indexOf(componentChildItem)}
          />
        );
      } else {
        returnItem.push(
          <DrawerMenuItemWithChild
            key={componentChildItem.componentKey}
            item={componentChildItem}
          />
        );
      }
    }

    return returnItem;
  }, [item.componentChild]);

  const childItemCollapse = useMemo(() => {
    if (childItem.length > 0) {
      const handleExpand = () => {
        setOpenChild(!openChild);
      };

      const customListItemButtonSx = { justifyContent: openDrawer ? 'initial' : 'center' };

      const listItemTextSx = { opacity: openDrawer ? 1 : 0, color: 'rgba(98, 98, 98)' };

      return (
        <>
          <Tooltip
            TransitionComponent={Zoom}
            title={!openDrawer ? item.componentLabel : ''}
            placement={'right'}
            arrow
          >
            <CustomListItem onClick={handleExpand} disablePadding>
              <CustomListItemButton sx={customListItemButtonSx}>
                <CustomListItemIcon>{itemCustomListItemIcon}</CustomListItemIcon>
                <ListItemText primary={item.componentLabel} sx={listItemTextSx} />
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
  }, [childItem, expandButton, item.componentLabel, itemCustomListItemIcon, openChild, openDrawer]);

  return <Box>{childItemCollapse}</Box>;
};

export const CustomListItem = styled(ListItem)({
  borderRadius: 25,
  padding: 0,
});

export const CustomListItemButton = styled(ListItemButton)({
  height: '38px',
  padding: 0,
  justifyContent: 'center',
  borderRadius: 25,
  '&:hover': {
    backgroundColor: '#d9d8d8',
  },
  '&:active': {
    boxShadow: '#a8a8a8',
    color: '#000000',
  },
});

export const CustomListItemIcon = styled(ListItemIcon)({
  justifyContent: 'center',
  color: 'rgba(98, 98, 98)',
});

export default DrawerMenu;
