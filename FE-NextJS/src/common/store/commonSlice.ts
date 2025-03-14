import { ILoginResponse } from '@/app/(auth)/login/model/LoginModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../lib/store';

interface CommonState {
  theme: string;
  language: string;
  isOpenDrawer: boolean;
  isLogin: boolean;
  isLoading: boolean;
  openConfirmDialog: boolean;
  loginData?: ILoginResponse;
  proxyType?: string;
}

const initialState: CommonState = {
  theme: '',
  language: 'en',
  isOpenDrawer: true,
  isLogin: false,
  isLoading: false,
  openConfirmDialog: false,
  proxyType: '',
};

const commonSlice = createSlice({
  name: 'commonState',
  initialState,
  reducers: {
    setLoginData: (state, action: PayloadAction<ILoginResponse>) => {
      const { payload } = action;
      return {
        ...state,
        loginData: payload,
      };
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
    toggleConfirmDialog: (state, action: PayloadAction<boolean>) => {
      const { payload } = action;
      return {
        ...state,
        openConfirmDialog: payload,
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
  },
});

export const {
  setLoginData,
  toggleDrawer,
  toggleLogin,
  toggleLoading,
  toggleConfirmDialog,
  setLanguage,
  resetCommon,
  setProxyType,
} = commonSlice.actions;

export const selectLoginData = (state: RootState) => state.commonState.loginData;
export const selectOpenDrawer = (state: RootState) => state.commonState.isOpenDrawer;
export const selectIsLogin = (state: RootState) => state.commonState.isLogin;
export const selectIsLoading = (state: RootState) => state.commonState.isLoading;
export const selectOpenConfirmDialog = (state: RootState) => state.commonState.openConfirmDialog;
export const selectLanguage = (state: RootState) => state.commonState.language;
export const selectProxyType = (state: RootState) => state.commonState.proxyType;

export default commonSlice.reducer;
