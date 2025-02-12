'use client';

import { getFile } from '@/common/api/fileApi';
import { CURRENT_PATH, RESET_ALL } from '@/common/constants/commonConst';
import { LOGIN_URL } from '@/common/constants/urlConst';
import useNavigate from '@/common/hooks/useNavigate';
import { selectLoginData } from '@/common/store/commonSlice';
import IconButton from '@/components/button/IconButton';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { Logout, Settings } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { MouseEvent, useCallback, useEffect, useState } from 'react';

const UserPopover = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [imageBase64, setImageBase64] = useState<string | null | undefined>(null);

  const open = Boolean(anchorEl);
  const loginData = useAppSelector(selectLoginData);
  const dispatch = useAppDispatch();
  const { navigate } = useNavigate();

  useEffect(() => {
    const settingImage = async () => {
      const imageFile = await getFile(loginData?.userResponse?.image);
      setImageBase64(imageFile?.base64);
    };

    settingImage();
  }, [loginData?.userResponse?.image]);

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
          backgroundImage: loginData?.userResponse?.image ? `url(${imageBase64})` : '',
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
