import CssBaseline from '@mui/material/CssBaseline';
import { memo, ReactNode } from 'react';
import i18next from '../i18n';
import { I18nextProvider } from 'react-i18next';
import StoreProvider from 'common/provider/StoreProvider';
import ApiProvider from 'common/provider/ApiProvider';
import PopupDialogContainer from 'components/dialog/PopupDialogContainer';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <head lang="en">
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
        <title>Work Flow</title>
      </head>
      <body>
        <div id="root">
          <StoreProvider>
            <ApiProvider>
              <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
            </ApiProvider>
            <PopupDialogContainer />
            <CssBaseline />
          </StoreProvider>
        </div>
      </body>
    </html>
  );
};

export default memo(RootLayout);
