import { RESET_ALL } from '@/common/constants/commonConst';
import commonSlice from '@/common/store/commonSlice';
import { combineReducers } from '@reduxjs/toolkit';
import { Transform } from 'redux-persist';
import createWebStorage from 'redux-persist/es/storage/createWebStorage';

// All state
const combineReducer = combineReducers({
  commonState: commonSlice,
});

// Check is client or server
export const isClient = typeof window !== 'undefined';

// Create sessionStorage
export const sessionStorage = createWebStorage('session');

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
