'use client';
import Loading from '@/app/loading';
import { memo, ReactElement, ReactNode, Suspense } from 'react';

const Backdrop = ({ children }: { children?: ReactElement | ReactNode }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default memo(Backdrop);
