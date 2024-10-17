import { memo } from 'react';
import BackdropLoading from '@/components/loading/BackdropLoading';

const Loading = () => {
  return <BackdropLoading />;
};

export default memo(Loading);
