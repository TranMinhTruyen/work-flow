import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'common/store';
import { ILoginResponse } from 'model/login/LoginModel';

interface CommonState {
  theme: string;
  isOpenDrawer: boolean;
  isLogin: boolean;
  isLoading: boolean;
  openConfirmDialog: boolean;
  loginData?: ILoginResponse;
}

const initialState: CommonState = {
  theme: '',
  isOpenDrawer: true,
  isLogin: false,
  isLoading: false,
  openConfirmDialog: false,
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
    toggleLogin: state => {
      return {
        ...state,
        isLogin: !state.isLogin,
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
  },
});

export const { setLoginData, toggleDrawer, toggleLogin, toggleLoading, toggleConfirmDialog } =
  commonSlice.actions;

export const selectLoginData = (state: RootState) => state.commonState.loginData;
export const selectOpenDrawer = (state: RootState) => state.commonState.isOpenDrawer;
export const selectIsLogin = (state: RootState) => state.commonState.isLogin;
export const selectIsLoading = (state: RootState) => state.commonState.isLoading;
export const selectOpenConfirmDialog = (state: RootState) => state.commonState.openConfirmDialog;

export default commonSlice.reducer;