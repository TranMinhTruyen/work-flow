import { memo, ReactNode } from 'react';
import StoreProvider from '../common/provider/StoreProvider';
import ApiProvider from '../common/provider/ApiProvider';

export const metadata = {
  title: 'Work flow',
  charset: 'utf-8',
  content: 'initial-scale=1, width=device-width',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div id="root">
          <StoreProvider>
            <ApiProvider>{children}</ApiProvider>
          </StoreProvider>
        </div>
      </body>
    </html>
  );
};

export default memo(RootLayout);
