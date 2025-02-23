'use client';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { ReactNode } from 'react';
import './globals.css';
import Main from './main';

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
          <Main>{children}</Main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
