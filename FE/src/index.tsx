import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import DialogContainer from 'components/dialog/DialogContainer';
import store from 'common/store';
import React from 'react';

const render = async () => {
  const rootNode = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

  rootNode.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <CssBaseline />
      <DialogContainer />
    </Provider>
  );
};
render();
reportWebVitals();
