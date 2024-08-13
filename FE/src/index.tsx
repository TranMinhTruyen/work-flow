import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import DialogContainer from 'components/dialog/DialogContainer';
import store from 'common/store';
import { StrictMode } from 'react';

const render = async () => {
  const rootNode = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

  rootNode.render(
    <StrictMode>
      <Provider store={store}>
        <App />
        <DialogContainer />
      </Provider>
    </StrictMode>
  );
};
render();
reportWebVitals();
