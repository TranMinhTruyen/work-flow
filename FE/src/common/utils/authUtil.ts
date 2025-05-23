import forge from 'node-forge';

import { setLoginData, setScreenMaster } from '@/common/store/commonSlice';
import { IScreenItem } from '@/components/drawer/ScreenListItem';
import store from '@/lib/store';
import { IUserResponse } from '@/pages/auth-page/login/model/LoginResponse';
import { userServices } from '@/services/userService';

import { ApiEnum } from '../api/apiUrl';
import { axiosApiEnumFetch } from '../api/axios';
import { PUBLIC_RSA_KEY } from '../constants/commonConst';
import { CustomAxiosConfig } from '../constants/typeConst';
import { IScreenMaster } from '../model/ScreenMaster';
import { IUserData } from '../model/user';
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
    const loginData: IUserData = JSON.parse(login);
    store.dispatch(setLoginData(loginData));
    return true;
  }

  return false;
};

/**
 * Get login data.
 *
 * @returns ILoginResponse
 */
export const getLoginData = (): IUserData | undefined => {
  let login = localStorage.getItem('login');

  if (isNullOrEmpty(login)) {
    login = sessionStorage.getItem('login');
  }

  if (!isNullOrEmpty(login)) {
    const data: IUserData = JSON.parse(login);
    return data;
  }

  return store.getState().commonState.loginData;
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
export const checkAccessScreen = (
  screenItem: IScreenItem,
  screenMasterList?: IScreenMaster[]
): boolean => {
  let isAccess = true;

  if (isNullOrEmpty(screenItem.screenPath) || screenItem.screenChild === null) {
    if (!screenMasterList?.find(item => item.screenId === screenItem.screenKey)?.active) {
      return false;
    }

    if (
      !screenMasterList ||
      !screenMasterList?.map(item => item.screenId).includes(screenItem.screenKey)
    ) {
      isAccess = false;
    }
  }

  return isAccess;
};

export const handleCheckToken = async () => {
  await axiosApiEnumFetch(ApiEnum.TOKEN_CHECK, {} as CustomAxiosConfig<null>);
};

export const handleGetUserProfile = async () => {
  const response: IUserResponse = await store
    .dispatch(userServices.endpoints.getUser.initiate())
    .unwrap();
  store.dispatch(setScreenMaster(response.screenMasterList ?? []));
};
