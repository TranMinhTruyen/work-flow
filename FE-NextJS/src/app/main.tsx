import RootProvider from '@/common/provider/RootProvider';
import DialogContainer from '@/components/dialog/DialogContainer';
import BackButtonListener from '@/components/loading/BackButtonListener ';
import BackdropLoading from '@/components/loading/BackdropLoading';
import store, { persistor } from '@/lib/store';
import CssBaseline from '@mui/material/CssBaseline';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

const PersistGate = dynamic(
  () => import('redux-persist/integration/react').then(mod => mod.PersistGate),
  { ssr: false }
);

const Main = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<BackdropLoading />} persistor={persistor}>
        <CssBaseline />
        <RootProvider>{children}</RootProvider>
        <BackButtonListener />
        <DialogContainer />
      </PersistGate>
    </Provider>
  );
};

export default Main;
