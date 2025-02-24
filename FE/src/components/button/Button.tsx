import { CircularProgress } from '@mui/material';
import Badge from '@mui/material/Badge';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { ReactNode, useMemo } from 'react';

export type ButtonProps = MuiButtonProps & {
  label?: string | ReactNode;
  isLoading?: boolean;
  height?: number;
  width?: number;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  badgeContent?: number;
};

const Button = (props: ButtonProps) => {
  const {
    label,
    isLoading = false,
    width = 100,
    height = 30,
    startIcon,
    endIcon,
    badgeContent,
    className,
    ...restProps
  } = props;

  const loadingComponent = useMemo(
    () =>
      isLoading ? <CircularProgress variant={'indeterminate'} disableShrink size={20} /> : label,
    [isLoading, label]
  );

  return (
    <Badge badgeContent={badgeContent} max={99} color={'error'}>
      <StyleButton
        className={className}
        startIcon={!isLoading ? startIcon : null}
        endIcon={!isLoading ? endIcon : null}
        width={width}
        height={height}
        {...restProps}
      >
        {loadingComponent}
      </StyleButton>
    </Badge>
  );
};

const StyleButton = styled(MuiButton)<ButtonProps>(({ width, height }) => ({
  width: `${width}px`,
  height: `${height}px`,
  boxShadow: 'rgba(168, 168, 168, 1)',
  textTransform: 'none',
  borderRadius: 25,
  lineHeight: 1.5,
  color: 'rgba(0, 0, 0, 1)',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  '&:hover': {
    boxShadow: 'rgba(168, 168, 168, 1)',
    backgroundColor: 'rgba(210, 210, 210, 0.8)',
  },
}));

export default Button;
