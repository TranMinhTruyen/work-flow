import { Badge, CircularProgress } from '@mui/material';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { memo, ReactNode } from 'react';

type IconButtonProps = MuiButtonProps & {
  width?: number;
  height?: number;
  icon?: ReactNode;
  isLoading?: boolean;
  badgeContent?: number;
};

const IconButton = (props: IconButtonProps) => {
  const {
    width = 40,
    height = 40,
    icon,
    isLoading = false,
    badgeContent,
    className,
    ...restProps
  } = props;

  const loadingComponent = isLoading ? (
    <CircularProgress
      variant={'indeterminate'}
      disableShrink
      size={20}
      sx={{ color: 'rgba(255, 255, 255, 1)' }}
    />
  ) : (
    icon
  );

  return (
    <StyleIconButton className={className} width={width} height={height} {...restProps}>
      <Badge
        badgeContent={badgeContent}
        max={99}
        color={'error'}
        sx={{ transform: icon ? 'translate(28px, -16px)' : 'translate(18px, -20px)' }}
      />
      {loadingComponent}
    </StyleIconButton>
  );
};
export default memo(IconButton);

const StyleIconButton = styled(MuiButton)<IconButtonProps>(({ width, height }) => ({
  width: `${width}px !important`,
  height: `${height}px !important`,
  minHeight: `${width}px`,
  minWidth: `${height}px`,
  boxShadow: 'rgba(168, 168, 168, 1)',
  textTransform: 'none',
  fontSize: 16,
  borderRadius: 25,
  lineHeight: 1.5,
  backgroundColor: 'rgba(255, 255, 255, 1)',
  '&:hover': {
    boxShadow: 'rgba(168, 168, 168, 1)',
    backgroundColor: 'rgba(210, 210, 210, 0.8)',
    color: 'rgba(0, 0, 0, 1)',
  },
}));
