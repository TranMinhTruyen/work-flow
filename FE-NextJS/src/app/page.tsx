import { AppProps } from 'next/app';
import { memo } from 'react';

const RootPage = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default memo(RootPage);
