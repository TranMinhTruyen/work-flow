'use client';

import { get } from '@/common/api/apiS3Object';
import { RESET_ALL } from '@/common/constants/commonConst';
import { HTMLElement, NullString } from '@/common/constants/typeConst';
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
import { memo, MouseEvent, useCallback, useEffect, useState } from 'react';

const UserPopover = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement>(null);
  const [imageBase64, setImageBase64] = useState<NullString>(null);

  const open = Boolean(anchorEl);
  const loginData = useAppSelector(selectLoginData);
  const dispatch = useAppDispatch();
  const { navigate } = useNavigate();

  useEffect(() => {
    const getImage = async () => {
      if (loginData && loginData.userResponse && loginData.userResponse.image) {
        const imageFile = await get({
          bucketName: 'workflow',
          objectId: loginData.userResponse.image,
        });
        if (imageFile) {
          setImageBase64(imageFile.base64);
        }
      }
    };

    getImage();
  }, [loginData]);

  const handleClick = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(async () => {
    setAnchorEl(null);
  }, []);

  const handleLogout = useCallback(() => {
    dispatch({ type: RESET_ALL });
    localStorage.removeItem('login');
    sessionStorage.removeItem('login');
    navigate(LOGIN_URL, true);
  }, [dispatch, navigate]);

  return (
    <>
      <IconButton
        onClick={handleClick}
        icon={!imageBase64 ? <AccountCircleIcon /> : null}
        sx={{
          backgroundImage: imageBase64 ? `url(${imageBase64})` : '',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      />
      <StyledMenu
        anchorEl={anchorEl as unknown as Element}
        id={'account-menu'}
        open={open}
        onClose={handleClose}
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

export default memo(UserPopover);
