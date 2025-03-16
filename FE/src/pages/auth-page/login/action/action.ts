import { setLoginData, toggleLogin } from '@/common/store/commonSlice';
import { encryptWithRSA } from '@/common/utils/authUtil';
import store from '@/lib/store';
import { userServices } from '@/services/userService';

import ILoginForm from '../model/LoginForm';
import ILoginRequest from '../model/LoginRequest';
import ILoginResponse from '../model/LoginResponse';

/**
 * Handle click submit button.
 * @param data
 */
export const handleSubmitLogin = async (data: ILoginForm): Promise<boolean> => {
  const loginRequest: ILoginRequest = {
    ...data,
    password: encryptWithRSA(data.password),
  };

  const response = await store
    .dispatch(userServices.endpoints.login.initiate(loginRequest))
    .unwrap();

  if (response) {
    await setToken(response, data.isRemember);
    return true;
  } else {
    return false;
  }
};

/**
 * Set token when login success.
 *
 * @param loginResponse
 * @param isRemember
 */
const setToken = async (loginResponse: ILoginResponse, isRemember: boolean = false) => {
  if (!isRemember) {
    sessionStorage.setItem('login', JSON.stringify(loginResponse) ?? '');
  } else {
    localStorage.setItem('login', JSON.stringify(loginResponse) ?? '');
  }

  store.dispatch(setLoginData(loginResponse));
  store.dispatch(toggleLogin(true));
};
