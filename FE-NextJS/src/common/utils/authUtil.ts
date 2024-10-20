import { isNullOrEmpty } from './stringUtil';
import { PUBLIC_RSA_KEY } from '../constants/commonConst';
import forge from 'node-forge';
import { ILoginResponse } from '@/model/login/LoginModel';
import store from '../store';
import { setLoginData, toggleLogin } from '../commonSlice';

/**
 * Check token and set token to slice.
 *
 * @returns
 */
export const checkLogin = () => {
  if (store().getState().commonState.loginData !== undefined) {
    return true;
  }

  let login = localStorage.getItem('login');

  if (isNullOrEmpty(login)) {
    login = sessionStorage.getItem('login');
  }

  if (!isNullOrEmpty(login)) {
    const data: ILoginResponse = JSON.parse(login);
    store().dispatch(setLoginData(data));
    store().dispatch(toggleLogin(true));
    return true;
  }

  return false;
};

export const getLoginData = (): ILoginResponse | undefined => {
  return store().getState().commonState.loginData;
};

export const encryptWithRSA = (data?: string) => {
  if (data) {
    const key = forge.pki.publicKeyFromPem(PUBLIC_RSA_KEY);
    const encrypted = key.encrypt(forge.util.encodeUtf8(data));
    return forge.util.encode64(encrypted);
  }
};
