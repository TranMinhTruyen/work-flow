import { isNullOrEmpty } from './stringUtil';
import forge from 'node-forge';
import { ILoginResponse } from '@/model/login/LoginModel';
import { ICheckProxyRequest, ICheckProxyResponse } from '@/model/proxy/ProxyModel';
import { proxyService } from '@/services/proxyService';
import store from '@/lib/store';
import { setLoginData, setProxyRole, toggleLogin } from '@/lib/slices/commonSlice';
import { PUBLIC_RSA_KEY } from '../constants/commonConst';

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
    store.dispatch(toggleLogin(true));
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
 * Check role from ipAddress.
 *
 * @returns ICheckProxyResponse
 */
export const handleCheckProxy = async () => {
  const clientIp = document.cookie
    .split(';')
    .find(row => row.startsWith('client-ip='))
    ?.split('=')[1];

  const request: ICheckProxyRequest = {
    ipAddress:
      process.env.NODE_ENV !== 'production' ? '127.0.0.1' : decodeURIComponent(clientIp ?? ''),
  };

  const response: ICheckProxyResponse = await store
    .dispatch(proxyService.endpoints.checkProxy.initiate(request))
    .unwrap();

  store.dispatch(setProxyRole(response?.role));
};
