import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ILoginResponse } from '@/model/login/LoginModel';

interface CommonState {
  theme: string;
  language: string;
  isOpenDrawer: boolean;
  isLogin: boolean;
  isLoading: boolean;
  openConfirmDialog: boolean;
  loginData?: ILoginResponse;
  proxyRole?: string;
}

const initialState: CommonState = {
  theme: '',
  language: 'en',
  isOpenDrawer: true,
  isLogin: false,
  isLoading: false,
  openConfirmDialog: false,
  proxyRole: '',
};

export const commonSlice = createSlice({
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
    setProxyRole: (state, action: PayloadAction<string | undefined>) => {
      const { payload } = action;
      return {
        ...state,
        proxyRole: payload,
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
  setProxyRole,
} = commonSlice.actions;

export const selectLoginData = (state: RootState) => state.commonState.loginData;
export const selectOpenDrawer = (state: RootState) => state.commonState.isOpenDrawer;
export const selectIsLogin = (state: RootState) => state.commonState.isLogin;
export const selectIsLoading = (state: RootState) => state.commonState.isLoading;
export const selectOpenConfirmDialog = (state: RootState) => state.commonState.openConfirmDialog;
export const selectLanguage = (state: RootState) => state.commonState.language;
export const selectProxyRole = (state: RootState) => state.commonState.proxyRole;

export default commonSlice.reducer;
