import baseApi from '@/common/api/apiBaseQuery';
import { ILoginRequest, ILoginResponse } from '@/model/login/LoginModel';

const PREFIX = '/user-account';

export const loginService = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: request => ({
        url: `${PREFIX}/login`,
        data: request,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginService;
