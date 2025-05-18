import baseApi from '@/common/api/apiBaseQuery';
import { ApiEnum } from '@/common/api/apiUrl';
import ILoginRequest from '@/pages/auth-page/login/model/LoginRequest';
import ILoginResponse, { IUserResponse } from '@/pages/auth-page/login/model/LoginResponse';
import IRegisterRequest from '@/pages/auth-page/register/model/RegisterRequest';
import IRegisterResponse from '@/pages/auth-page/register/model/RegisterResponse';
import { IUserDetailRequest } from '@/pages/main-page/settings/user/model/request/UserDetailRequest';

export const userServices = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: request => ({
        api: ApiEnum.LOGIN,
        data: request,
      }),
    }),

    register: builder.mutation<IRegisterResponse, IRegisterRequest>({
      query: request => ({
        api: ApiEnum.CREATE_USER,
        data: request,
      }),
    }),

    getUser: builder.mutation<IUserResponse, void>({
      query: () => ({
        api: ApiEnum.GET_USER,
      }),
    }),

    getUserDetail: builder.mutation<IUserResponse, IUserDetailRequest>({
      query: request => ({
        api: ApiEnum.GET_USER_DETAIL,
        data: request,
      }),
    }),
  }),
});

export const { useRegisterMutation } = userServices;
