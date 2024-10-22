import baseApi from '@/common/api/apiBaseQuery';
import { USER_PREFIX } from '@/common/constants/apiPrefixConst';
import { ILoginRequest, ILoginResponse } from '@/model/login/LoginModel';

export const loginService = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: request => ({
        url: `${USER_PREFIX}/login`,
        data: request,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginService;
