import { ILoginResponse } from 'model/login/LoginModel';
import { isNullOrEmpty } from './utils/stringUtil';
import store from './store';
import { setLoginData } from './commonSlice';

/**
 * Check token and set token to slice.
 *
 * @returns
 */
export const checkLogin = () => {
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
