import baseApi from '@/common/api/apiBaseQuery';
import { ApiEnum } from '@/common/enums/ApiEnum';
import { ILoginRequest, ILoginResponse } from '@/pages/auth-page/login/model/LoginModel';
import {
  IRegisterRequest,
  IRegisterResponse,
} from '../pages/auth-page/register/model/RegisterModel';

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
  }),
});

export const { useRegisterMutation } = userServices;
