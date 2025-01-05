import baseApi from '@/common/api/apiBaseQuery';
import { RESET_ALL } from '@/common/constants/commonConst';
import { combineReducers } from '@reduxjs/toolkit';
import { Transform } from 'redux-persist';
import createWebStorage from 'redux-persist/es/storage/createWebStorage';
import noopStorage from './noopStorage';
import commonSlice from './slices/commonSlice';
import kanbanSlice from './slices/kanbanSlice';

// All state
const combineReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer, // add Reducer from apiBaseQuery,
  commonState: commonSlice,
  kanbanState: kanbanSlice,
});

// Check is client or server
export const isClient = typeof window !== 'undefined';

// Check and create sessionStorage
export const createSessionStorage = () => {
  if (isClient) {
    return createWebStorage('session');
  }
  return noopStorage;
};

// Create sessionStorage
export const sessionStorage = createSessionStorage();

// Create combineReducer
export const rootReducer = (state: any, action: any) => {
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

// Store needed value from commonState
export const commonTransform: Transform<any, any> = {
  in: (inboundState: any) => {
    return {
      theme: inboundState.theme,
      language: inboundState.language,
      isOpenDrawer: inboundState.isOpenDrawer,
      isLogin: inboundState.isLogin,
    };
  },
  out: (outboundState: any) => {
    return outboundState;
  },
};
