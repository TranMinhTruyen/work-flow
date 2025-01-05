import baseApi from '@/common/api/apiBaseQuery';
import { ApiEnum } from '@/common/enums/ApiEnum';
import { IRegisterRequest, IRegisterResponse } from '@/model/register/RegisterModel';

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
