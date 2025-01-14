'use client';
import { useState, MouseEvent, useCallback } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import { Logout, Settings } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { selectLoginData } from '@/common/store/commonSlice';
import useNavigate from '@/common/hooks/useNavigate';
import { CURRENT_PATH, RESET_ALL } from '@/common/constants/commonConst';
import { LOGIN_URL } from '@/common/constants/urlConst';
import IconButton from '@/components/button/IconButton';

const UserPopover = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const loginData = useAppSelector(selectLoginData);
  const dispatch = useAppDispatch();
  const { navigate } = useNavigate();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = useCallback(() => {
    dispatch({ type: RESET_ALL });
    localStorage.removeItem('login');
    sessionStorage.removeItem('login');
    sessionStorage.removeItem(CURRENT_PATH);
    navigate(LOGIN_URL, true);
  }, [dispatch, navigate]);

  return (
    <>
      <IconButton
        onClick={handleClick}
        icon={!loginData?.userResponse?.image ? <AccountCircleIcon /> : null}
        sx={{
          backgroundImage: loginData?.userResponse?.image
            ? `url(data:image/png;base64,${loginData?.userResponse?.image?.data})`
            : '',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      />
      <StyledMenu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            sx: {
              width: 250,
              overflow: 'visible',
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 15,
                width: 10,
                height: 10,
                backgroundColor: 'inherit',
                transform: 'translateY(-50%) rotate(45deg)',
              },
            },
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountCircleIcon fontSize={'medium'} />
          </ListItemIcon>
          Profile
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize={'medium'} />
          </ListItemIcon>
          Settings
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize={'medium'} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </StyledMenu>
    </>
  );
};

const StyledMenu = styled(Menu)({
  elevation: 0,
  overflow: 'visible',
  marginTop: 10,
  '& .MuiAvatar-root': {
    width: 35,
    height: 35,
    marginRight: 10,
  },
});

export default UserPopover;
