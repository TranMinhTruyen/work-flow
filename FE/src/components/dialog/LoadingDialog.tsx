import { selectIsLoading } from '@/common/store/commonSlice';
import { useAppSelector } from '@/lib/store';

import BackdropLoading from '../loading/BackdropLoading';

const LoadingDialog = () => {
  const isLoading: boolean = useAppSelector(selectIsLoading);
  return <BackdropLoading open={isLoading} />;
};
export default LoadingDialog;
