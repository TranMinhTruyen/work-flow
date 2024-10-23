import baseApi from '@/common/api/apiBaseQuery';
import { UserApi } from '@/common/enums/ApiEnum';
import { ILoginRequest, ILoginResponse } from '@/model/login/LoginModel';

export const loginService = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: request => ({
        api: UserApi.LOGIN,
        data: request,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginService;
