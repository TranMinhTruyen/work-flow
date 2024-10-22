import { setLoginData, toggleLogin } from '@/lib/slices/commonSlice';
import store from '@/lib/store';
import { ILoginRequest, ILoginResponse } from '@/model/login/LoginModel';
import { encryptWithRSA } from '@/common/utils/authUtil';
import { ILoginForm } from '@/model/login/LoginForm';
import { loginService } from '@/services/loginService';

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
  store.dispatch(toggleLogin(true));
};
