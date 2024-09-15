import { memo, useCallback, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import DrawerItemList, { DrawerItem } from './DrawerListItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { selectLoginData, selectOpenDrawer } from 'common/commonSlice';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useAppSelector } from 'common/store';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import Grid2 from '@mui/material/Grid2';

const itemList = DrawerItemList;

export interface IDrawerMenuItemProps {
  isChild?: boolean;
  childIndex?: number;
  item: DrawerItem;
}

const DrawerMenu = () => {
  const loginData = useAppSelector(selectLoginData);

  const drawerItemList = useMemo(() => {
    const returnItem: JSX.Element[] = [];

    if (itemList.length === 0) {
      return returnItem;
    }

    for (const componentItem of itemList) {
      if (
        componentItem.componentRole !== null &&
        !componentItem.componentRole.includes(loginData?.userResponse?.role ?? '')
      ) {
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
  }, [loginData?.userResponse?.role]);

  return (
    <Grid2 key={'drawer-menu'} container sx={{ padding: 1 }} spacing={1}>
      {drawerItemList}
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

  const customListItemSx = {
    marginTop: isChild && childIndex !== 0 ? 8 : 0,
    backgroundColor: pathname === item.componentPath ? 'rgba(205, 205, 205, 0.8)' : '#ffffff',
    color: pathname === item.componentPath ? 'rgba(0, 109, 255, 0.8)' : 'rgba(98, 98, 98)',
  };

  const customListItemButtonSx = { justifyContent: openDrawer ? 'initial' : 'center' };

  const customListItemIconSx = { mr: openDrawer ? 3 : 'auto' };

  const customListItemIconAndTextSx =
    pathname === item.componentPath
      ? { color: 'rgba(0, 109, 255, 0.8)' }
      : { color: 'rgba(98, 98, 98)' };

  const listItemTextSx = { opacity: openDrawer ? 1 : 0, color: 'rgba(98, 98, 98)' };

  const itemCustomListItemIcon = useMemo(
    () => (
      <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
        {item.componentIcon}
        {/* {!openDrawer && (
          <Typography
            sx={{
              fontSize: '11px',
              fontWeight: 'bold',
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              maxWidth: 50,
              textAlign: 'center',
            }}
          >
            {item.componentLabel}
          </Typography>
        )} */}
      </Stack>
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
            <CustomListItemIcon style={customListItemIconAndTextSx} sx={customListItemIconSx}>
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
  const loginData = useAppSelector(selectLoginData);

  const expandButton = useMemo(
    () =>
      openDrawer ? (
        openChild ? (
          <ExpandLess sx={{ color: 'rgba(98, 98, 98)' }} />
        ) : (
          <ExpandMore sx={{ color: 'rgba(98, 98, 98)' }} />
        )
      ) : (
        <></>
      ),
    [openChild, openDrawer]
  );

  const itemCustomListItemIcon = useMemo(
    () => (
      <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
        {item.componentIcon}
        {/* {!openDrawer && (
          <Typography
            sx={{
              fontSize: '11px',
              fontWeight: 'bold',
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              maxWidth: 50,
              textAlign: 'center',
            }}
          >
            {item.componentLabel}
          </Typography>
        )} */}
      </Stack>
    ),
    [item.componentIcon]
  );

  const childItem = useMemo(() => {
    const returnItem: JSX.Element[] = [];

    if (item.componentChild === undefined || item.componentChild === null) {
      return returnItem;
    }

    for (const componentChildItem of item.componentChild) {
      if (
        componentChildItem.componentRole !== null &&
        !componentChildItem.componentRole.includes(loginData?.userResponse?.role ?? '')
      ) {
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
  }, [item.componentChild, loginData?.userResponse?.role]);

  const childItemCollapse = useMemo(() => {
    if (childItem.length > 0) {
      const handleExpand = () => {
        setOpenChild(!openChild);
      };

      const customListItemButtonSx = { justifyContent: openDrawer ? 'initial' : 'center' };

      const customListItemIconSx = { mr: openDrawer ? 3 : 'auto' };

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
                <CustomListItemIcon sx={customListItemIconSx}>
                  {itemCustomListItemIcon}
                </CustomListItemIcon>
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
  display: 'block',
});

export const CustomListItemButton = styled(ListItemButton)({
  minHeight: 50,
  minWidth: 0,
  px: 2.5,
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
  minWidth: 0,
  justifyContent: 'center',
  color: 'rgba(98, 98, 98)',
});

export default memo(DrawerMenu);
