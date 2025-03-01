import CssBaseline from '@mui/material/CssBaseline';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App.tsx';
import './i18n.ts';
import './index.css';
import store, { persistor } from './lib/store.ts';

ModuleRegistry.registerModules([AllCommunityModule]);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <CssBaseline />
    </PersistGate>
  </Provider>
);
