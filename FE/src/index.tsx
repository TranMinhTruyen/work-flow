import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import { CssBaseline } from '@mui/material';
import './i18n.ts';
import store from './common/store';
import PopupDialogContainer from 'components/dialog/PopupDialogContainer.tsx';

const render = async () => {
  const rootNode = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

  rootNode.render(
    <StrictMode>
      <Provider store={store}>
        <App />
        <PopupDialogContainer />
        <CssBaseline />
      </Provider>
    </StrictMode>
  );
};
render();
reportWebVitals();
