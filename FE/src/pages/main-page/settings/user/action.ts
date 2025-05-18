import store from '@/lib/store';
import { IUserResponse } from '@/pages/auth-page/login/model/LoginResponse';
import { userServices } from '@/services/userService';

import { IUserDetailRequest } from './model/request/UserDetailRequest';

export const getUserDetail = async (userId?: string, isLogin?: boolean) => {
  const request: IUserDetailRequest = {
    userId: userId,
    isLogin: isLogin,
  };

  const response: IUserResponse = await store
    .dispatch(userServices.endpoints.getUserDetail.initiate(request))
    .unwrap();

  return response;
};
