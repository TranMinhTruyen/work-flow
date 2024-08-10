import { CircularProgress, Badge, Fab, FabProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { memo, ReactNode } from 'react';

type IconButtonProps = FabProps & {
  width?: number;
  height?: number;
  icon?: ReactNode;
  isLoading?: boolean;
  badgeContent?: number;
};

const IconButton = (props: IconButtonProps) => {
  const { width = 40, height = 40, icon, isLoading = false, badgeContent, ...restProps } = props;

  const loadingComponent = isLoading ? (
    <CircularProgress variant="indeterminate" disableShrink size={20} sx={{ color: '#ffffff' }} />
  ) : (
    icon
  );

  return (
    <StyleIconButton
      sx={{
        width: width,
        height: height,
      }}
      {...restProps}
    >
      <Badge
        badgeContent={badgeContent}
        max={99}
        color={'error'}
        sx={{ transform: 'translate(30px, -20px)' }}
      />
      {loadingComponent}
    </StyleIconButton>
  );
};
export default memo(IconButton);

const StyleIconButton = styled(Fab)({
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
