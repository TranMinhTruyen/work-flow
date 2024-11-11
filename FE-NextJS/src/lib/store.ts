import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RESET_ALL } from '../common/constants/commonConst';
import baseApi from '../common/api/apiBaseQuery';
import commonSlice from './slices/commonSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import noopStorage from './noopStorage';

const createSessionStorage = () => {
  if (typeof window !== 'undefined') {
    return createWebStorage('session');
  }
  return noopStorage;
};

const sessionStorage = createSessionStorage();

const isClient = typeof window !== 'undefined';

const combineReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer, // add Reducer from apiBaseQuery,
  commonState: commonSlice,
});

const rootReducer = (state: any, action: any) => {
  if (RESET_ALL === action.type) {
    const { commonState } = state;

    const resetCommonState = {
      ...commonState,
      isLogin: false,
      loginData: undefined,
    };

    state = {
      commonState: resetCommonState,
    };
  }
  return combineReducer(state, action);
};

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: isClient ? sessionStorage : noopStorage,
    whitelist: ['commonState'],
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
