'use client';
import { styled } from '@mui/material/styles';
import { memo, ReactNode, ReactElement } from 'react';
import Fab, { FabProps } from '@mui/material/Fab';
import CircularProgress from '@mui/material/CircularProgress';
import Grid2 from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';

export type ButtonProps = FabProps & {
  label?: string | ReactElement;
  isLoading?: boolean;
  height?: number;
  width?: number;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  badgeContent?: number;
};

const FloatButton = (props: ButtonProps) => {
  const {
    label,
    isLoading = false,
    width = 110,
    height = 40,
    startIcon,
    endIcon,
    badgeContent,
    ...restProps
  } = props;

  const loadingComponent = isLoading ? (
    <CircularProgress variant="indeterminate" disableShrink size={20} sx={{ color: '#ffffff' }} />
  ) : (
    <Stack direction={'row'} spacing={0.5}>
      {startIcon && <Grid2 container>{startIcon}</Grid2>}
      <Grid2 container>{label}</Grid2>
      {endIcon && <Grid2 container>{endIcon}</Grid2>}
    </Stack>
  );

  return (
    <StyleButton sx={{ width: width, height: height }} {...restProps}>
      <Badge
        badgeContent={badgeContent}
        max={99}
        color={'error'}
        sx={{ transform: 'translate(30px, -20px)' }}
      />
      {loadingComponent}
    </StyleButton>
  );
};

export default memo(FloatButton);

const StyleButton = styled(Fab)({
  boxShadow: '#a8a8a8',
  textTransform: 'none',
  fontSize: 16,
  borderRadius: 25,
  lineHeight: 1.5,
  backgroundColor: '#ffffff',
  '&:hover': {
    boxShadow: '#a8a8a8',
    backgroundColor: 'rgba(210, 210, 210, 0.8)',
    color: '#000000',
  },
});
