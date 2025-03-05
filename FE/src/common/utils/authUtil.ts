import forge from 'node-forge';

import { setLoginData } from '@/common/store/commonSlice';
import { IScreenItem } from '@/components/drawer/ScreenListItem';
import store from '@/lib/store';
import { ILoginResponse } from '@/pages/auth-page/login/model/loginModel';

import { ApiEnum } from '../api/apiUrl';
import { axiosApiEnumFetch } from '../api/axios';
import { PUBLIC_RSA_KEY } from '../constants/commonConst';
import { CustomAxiosConfig } from '../constants/typeConst';
import { isNullOrEmpty } from './stringUtil';

/**
 * Check token and set token to slice.
 *
 * @returns
 */
export const checkLogin = () => {
  if (store.getState().commonState.loginData !== undefined) {
    return true;
  }

  let login = localStorage.getItem('login');

  if (isNullOrEmpty(login)) {
    login = sessionStorage.getItem('login');
  }

  if (!isNullOrEmpty(login)) {
    const data: ILoginResponse = JSON.parse(login);
    store.dispatch(setLoginData(data));
    return true;
  }

  return false;
};

/**
 * Get login data.
 *
 * @returns ILoginResponse
 */
export const getLoginData = (): ILoginResponse | undefined => {
  let login = localStorage.getItem('login');

  if (isNullOrEmpty(login)) {
    login = sessionStorage.getItem('login');
  }

  if (!isNullOrEmpty(login)) {
    const data: ILoginResponse = JSON.parse(login);
    return data;
  }

  return undefined;
};

/**
 *
 * @param data Encrypt data with RSA key.
 *
 * @returns string
 */
export const encryptWithRSA = (data?: string) => {
  if (data) {
    const key = forge.pki.publicKeyFromPem(PUBLIC_RSA_KEY);
    const encrypted = key.encrypt(forge.util.encodeUtf8(data));
    return forge.util.encode64(encrypted);
  }
};

/**
 * Check access screen.
 *
 * @param screenItem
 * @returns
 */
export const checkAccessScreen = (screenItem: IScreenItem): boolean => {
  const userData = store.getState().commonState.loginData?.userResponse;

  let isAccess = true;

  if (!userData?.role || !screenItem.screenRole?.includes(userData?.role)) {
    isAccess = false;
  }

  if (!userData?.level || userData?.level < screenItem.screenLevel) {
    isAccess = false;
  }

  if (isNullOrEmpty(screenItem.screenPath) || screenItem.screenChild === null) {
    if (
      !userData?.screenMasterList ||
      !userData?.screenMasterList?.map(item => item.screenId).includes(screenItem.screenKey)
    ) {
      isAccess = false;
    }
  }

  return isAccess;
};

export const handleCheckToken = async () => {
  await axiosApiEnumFetch(ApiEnum.TOKEN_CHECK, {
    headers: {
      Authorization: `Bearer ${getLoginData()?.token}`,
    },
  } as CustomAxiosConfig<null>);
};
