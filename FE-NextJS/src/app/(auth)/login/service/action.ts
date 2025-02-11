import { ILoginForm } from '@/app/(auth)/login/model/LoginForm';
import { ILoginRequest, ILoginResponse } from '@/app/(auth)/login/model/LoginModel';
import { loginService } from '@/app/(auth)/login/service/loginService';
import { setLoginData, toggleLogin } from '@/common/store/commonSlice';
import { encryptWithRSA } from '@/common/utils/authUtil';
import store from '@/lib/store';

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

  if (!response) {
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
