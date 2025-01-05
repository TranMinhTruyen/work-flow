'use client';
import ApiProvider from '@/common/provider/ApiProvider';
import DialogContainer from '@/components/dialog/DialogContainer';
import BackButtonListener from '@/components/loading/BackButtonListener ';
import i18next from '@/i18n';
import store, { persistor } from '@/lib/store';
import CssBaseline from '@mui/material/CssBaseline';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { memo, ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './globals.css';

ModuleRegistry.registerModules([AllCommunityModule]);

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="initial-scale=1, width=device-width" />
            <title>Work flow</title>
          </head>
          <body>
            <main>
              <div id="root">
                <PersistGate loading={null} persistor={persistor}>
                  <ApiProvider>{children}</ApiProvider>
                </PersistGate>
                <BackButtonListener />
                <DialogContainer />
                <CssBaseline />
              </div>
            </main>
          </body>
        </html>
      </I18nextProvider>
    </Provider>
  );
};

export default memo(RootLayout);
