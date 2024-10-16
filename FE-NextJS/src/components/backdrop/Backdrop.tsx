'use client';
import { memo, ReactElement, ReactNode, Suspense } from 'react';
import Loading from '~/app/loading';

const Backdrop = ({ children }: { children?: ReactElement | ReactNode }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default memo(Backdrop);
