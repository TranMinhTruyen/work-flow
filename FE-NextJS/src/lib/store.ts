import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import baseApi from '../common/api/apiBaseQuery';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
} from 'redux-persist';
import { commonTransform, isClient, rootReducer, sessionStorage } from './persist';
import noopStorage from './noopStorage';

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer<RootState>(
  {
    key: 'root',
    storage: isClient ? sessionStorage : noopStorage,
    whitelist: ['commonState'],
    transforms: [commonTransform],
  },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: gDM =>
    gDM({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([baseApi.middleware]),
  devTools: true,
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
