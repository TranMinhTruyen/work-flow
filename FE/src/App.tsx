import { ReactNode, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import routerItemList from './common/constants/routerItemList';
import { AUTH_PREFIX, MAIN_PREFIX, screenUrl } from './common/constants/urlConst';
import BackdropLoading from './components/loading/BackdropLoading';

const BackgroundLoading = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<BackdropLoading />}>{children}</Suspense>;
};

// TODO add suspense
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AUTH_PREFIX}>
          {routerItemList
            .filter(item => item.screenPrefix === AUTH_PREFIX)
            .map((item, index) => (
              <Route
                key={index}
                path={item.screenPath}
                element={<BackgroundLoading>{item.screen}</BackgroundLoading>}
              />
            ))}
        </Route>

        <Route path={MAIN_PREFIX}>
          {routerItemList
            .filter(item => item.screenPrefix === MAIN_PREFIX)
            .map((item, index) => (
              <Route
                key={index}
                index={item.screenPath === screenUrl['LOGIN'].path ? true : false}
                path={item.screenPath}
                element={<BackgroundLoading>{item.screen}</BackgroundLoading>}
              />
            ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
