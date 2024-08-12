import { memo, useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid2 from '@mui/material/Unstable_Grid2';
import DrawerItemList, { DrawerItem } from './DrawerListItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../common/store';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { selectOpenDrawer } from 'common/commonSlice';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

const itemList = DrawerItemList;

export interface IDrawerMenuItemProps {
  isChild?: boolean;
  childIndex?: number;
  item: DrawerItem;
}

const DrawerMenu = () => {
  return (
    <Grid2 key={'drawer-menu'} container sx={{ padding: 1 }} spacing={1}>
      {itemList.map(item =>
        item.componentChild == null ? (
          <Grid2 key={item.componentKey} xs={12}>
            <DrawerMenuItem item={item} />
          </Grid2>
        ) : (
          <Grid2 key={item.componentKey} xs={12}>
            <DrawerMenuItemWithChild item={item} />
          </Grid2>
        )
      )}
    </Grid2>
  );
};

const DrawerMenuItem = ({ item, isChild = false, childIndex }: IDrawerMenuItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const openDrawer = useAppSelector(selectOpenDrawer);

  const handleOnClickItem = useCallback(
    (path: string) => () => {
      navigate(path);
    },
    [navigate]
  );

  const customListItemStyle = {
    marginTop: isChild && childIndex !== 0 ? 8 : 0,
    backgroundColor: pathname === item.componentPath ? 'rgba(205, 205, 205, 0.8)' : '#ffffff',
    color: pathname === item.componentPath ? 'rgba(0, 109, 255, 0.8)' : 'rgba(98, 98, 98)',
  };

  const customListItemButtonStyle = { justifyContent: openDrawer ? 'initial' : 'center' };

  const customListItemIconSx = { mr: openDrawer ? 3 : 'auto' };

  const customListItemIconAndTextStyle =
    pathname === item.componentPath
      ? { color: 'rgba(0, 109, 255, 0.8)' }
      : { color: 'rgba(98, 98, 98)' };

  const listItemTextSx = { opacity: openDrawer ? 1 : 0 };

  return (
    <Box>
      <CustomListItem
        style={customListItemStyle}
        onClick={handleOnClickItem(item.componentPath)}
        disablePadding
      >
        <CustomListItemButton sx={customListItemButtonStyle}>
          <CustomListItemIcon style={customListItemIconAndTextStyle} sx={customListItemIconSx}>
            {item.componentIcon}
          </CustomListItemIcon>
          <ListItemText
            primary={item.componentLabel}
            style={customListItemIconAndTextStyle}
            sx={listItemTextSx}
          />
        </CustomListItemButton>
      </CustomListItem>
    </Box>
  );
};

const DrawerMenuItemWithChild = ({ item }: IDrawerMenuItemProps) => {
  const [openChild, setOpenChild] = useState<boolean>(false);
  const openDrawer = useAppSelector(selectOpenDrawer);

  const handleExpand = () => {
    setOpenChild(!openChild);
  };

  const childItem = item.componentChild?.map(child =>
    child.componentChild == null ? (
      <DrawerMenuItem
        key={child.componentKey}
        item={child}
        childIndex={item.componentChild?.indexOf(child)}
      />
    ) : (
      <DrawerMenuItemWithChild key={child.componentKey} item={child} />
    )
  );

  const expandButton = openDrawer ? (
    openChild ? (
      <ExpandLess sx={{ color: 'rgba(98, 98, 98)' }} />
    ) : (
      <ExpandMore sx={{ color: 'rgba(98, 98, 98)' }} />
    )
  ) : (
    <></>
  );

  return (
    <Box>
      <CustomListItem onClick={handleExpand} disablePadding>
        <CustomListItemButton sx={{ justifyContent: openDrawer ? 'initial' : 'center' }}>
          <CustomListItemIcon sx={{ mr: openDrawer ? 3 : 'auto' }}>
            {item.componentIcon}
          </CustomListItemIcon>
          <ListItemText
            primary={item.componentLabel}
            sx={{
              opacity: openDrawer ? 1 : 0,
              color: 'rgba(98, 98, 98)',
            }}
          />
          {expandButton}
        </CustomListItemButton>
      </CustomListItem>
      <Collapse in={openChild} unmountOnExit>
        <Divider style={{ marginTop: 8 }} />
        <List
          component="div"
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
    </Box>
  );
};

export const CustomListItem = styled(ListItem)({
  borderRadius: 15,
  display: 'block',
});

export const CustomListItemButton = styled(ListItemButton)({
  minHeight: 50,
  minWidth: 0,
  px: 2.5,
  justifyContent: 'center',
  borderRadius: 15,
  '&:hover': {
    backgroundColor: '#d9d8d8',
  },
  '&:active': {
    boxShadow: '#a8a8a8',
    color: '#000000',
  },
});

export const CustomListItemIcon = styled(ListItemIcon)({
  minWidth: 0,
  justifyContent: 'center',
  color: 'rgba(98, 98, 98)',
});

export default memo(DrawerMenu);
