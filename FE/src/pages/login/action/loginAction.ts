import { setLoginData, toggleLogin } from 'common/commonSlice';
import store from 'common/store';
import { ILoginForm } from 'model/login/LoginForm';
import { ILoginRequest, ILoginResponse } from 'model/login/LoginModel';
import { loginService } from './loginService';
import { encryptWithRSA } from 'common/authServices';

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
    .dispatch(loginService.endpoints.login.initiate(loginRequest))
    .unwrap();

  if (response !== undefined) {
    setToken(response, data.isRemember);
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
const setToken = (loginResponse: ILoginResponse, isRemember: boolean = false) => {
  if (!isRemember) {
    sessionStorage.setItem('login', JSON.stringify(loginResponse) ?? '');
  } else {
    localStorage.setItem('login', JSON.stringify(loginResponse) ?? '');
  }
  store.dispatch(setLoginData(loginResponse));
  store.dispatch(toggleLogin());
};
