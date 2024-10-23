import baseApi from '@/common/api/apiBaseQuery';
import { UserApi } from '@/common/enums/ApiEnum';
import { IRegisterRequest, IRegisterResponse } from '@/model/register/RegisterModel';

export const registerService = baseApi.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation<IRegisterResponse, IRegisterRequest>({
      query: request => ({
        api: UserApi.CREATE,
        data: request,
      }),
    }),
  }),
});

export const { useRegisterMutation } = registerService;
