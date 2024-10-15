import { AppProps } from 'next/app';
import { memo } from 'react';

const Index = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default memo(Index);
