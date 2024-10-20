import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RESET_ALL } from './constants/commonConst';
import baseApi from './api/apiBaseQuery';
import commonSlice from './commonSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

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

export type AppStore = ReturnType<typeof configureStore> | any;

let storeInstance: AppStore | null = null;

export const store = () => {
  if (!storeInstance) {
    storeInstance = configureStore({
      reducer: rootReducer,
      middleware: gDM => gDM({ serializableCheck: false }).concat([baseApi.middleware]),
      devTools: true,
    });
  }
  return storeInstance;
};

setupListeners(store().dispatch);

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
