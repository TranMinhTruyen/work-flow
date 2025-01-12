'use client';
import RootProvider from '@/common/provider/RootProvider';
import DialogContainer from '@/components/dialog/DialogContainer';
import BackButtonListener from '@/components/loading/BackButtonListener ';
import store, { persistor } from '@/lib/store';
import CssBaseline from '@mui/material/CssBaseline';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './globals.css';

ModuleRegistry.registerModules([AllCommunityModule]);

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Work flow</title>
      </head>
      <body>
        <div id="root">
          <Provider store={store}>
            <CssBaseline />
            <RootProvider>
              <PersistGate persistor={persistor}>{children}</PersistGate>
            </RootProvider>
            <BackButtonListener />
            <DialogContainer />
          </Provider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
