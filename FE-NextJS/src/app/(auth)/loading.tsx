import { memo } from 'react';
import BackdropLoading from '@/components/loading/BackDropLoading';

const Loading = () => {
  return <BackdropLoading />;
};

export default memo(Loading);
