import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../lib/store';
import { IScreenMaster } from '../model/ScreenMaster';
import { IUserData } from '../model/user';

interface CommonState {
  theme: string;
  language: string;
  isOpenDrawer: boolean;
  isLogin: boolean;
  isLoading: boolean;
  loginData?: IUserData;
  screenMasterList?: IScreenMaster[];
  proxyType?: string;
  screenExpand: string[];
}

const initialState: CommonState = {
  theme: '',
  language: 'en',
  isOpenDrawer: true,
  isLogin: false,
  isLoading: false,
  proxyType: '',
  screenExpand: [],
  screenMasterList: [],
};

const commonSlice = createSlice({
  name: 'commonState',
  initialState: initialState,
  reducers: {
    setLoginData: (state, action: PayloadAction<IUserData>) => {
      const { payload } = action;
      return {
        ...state,
        loginData: payload,
      };
    },
    setScreenMaster: (state, action: PayloadAction<IScreenMaster[]>) => {
      const { payload } = action;
      state.screenMasterList = payload;
    },
    updateScreenStatus: (state, action: PayloadAction<{ screenId?: string; active: boolean }>) => {
      const { payload } = action;
      const screen = state.screenMasterList?.find(screen => screen.screenId === payload.screenId);
      if (screen) {
        screen.active = payload.active;
      }
    },
    toggleDrawer: state => {
      return {
        ...state,
        isOpenDrawer: !state.isOpenDrawer,
      };
    },
    toggleLogin: (state, action: PayloadAction<boolean>) => {
      const { payload } = action;
      return {
        ...state,
        isLogin: payload,
      };
    },
    toggleLoading: (state, action: PayloadAction<boolean>) => {
      const { payload } = action;
      return {
        ...state,
        isLoading: payload,
      };
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      return {
        ...state,
        language: payload,
      };
    },
    resetCommon: () => {
      return initialState;
    },
    setProxyType: (state, action: PayloadAction<string | undefined>) => {
      const { payload } = action;
      return {
        ...state,
        proxyType: payload,
      };
    },
    setScreenExpand: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.screenExpand.push(payload);
    },
    removeScreenExpand: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.screenExpand.splice(
        state.screenExpand.findIndex(item => item === payload),
        1
      );
    },
  },
});

export const {
  setLoginData,
  setScreenMaster,
  updateScreenStatus,
  toggleDrawer,
  toggleLogin,
  toggleLoading,
  setLanguage,
  resetCommon,
  setProxyType,
  setScreenExpand,
  removeScreenExpand,
} = commonSlice.actions;

export const selectLoginData = (state: RootState) => state.commonState.loginData;
export const selectScreenMaster = (state: RootState) => state.commonState.screenMasterList;
export const selectOpenDrawer = (state: RootState) => state.commonState.isOpenDrawer;
export const selectIsLogin = (state: RootState) => state.commonState.isLogin;
export const selectIsLoading = (state: RootState) => state.commonState.isLoading;
export const selectLanguage = (state: RootState) => state.commonState.language;
export const selectProxyType = (state: RootState) => state.commonState.proxyType;
export const selectScreenExpand = (state: RootState) => state.commonState.screenExpand;

export default commonSlice.reducer;
