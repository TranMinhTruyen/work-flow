import { IRegisterRequest, IRegisterResponse } from '@/app/(auth)/register/model/RegisterModel';
import baseApi from '@/common/api/apiBaseQuery';
import { ApiEnum } from '@/common/enums/ApiEnum';

export const registerService = baseApi.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation<IRegisterResponse, IRegisterRequest>({
      query: request => ({
        api: ApiEnum.CREATE_USER,
        data: request,
      }),
    }),
  }),
});

export const { useRegisterMutation } = registerService;
