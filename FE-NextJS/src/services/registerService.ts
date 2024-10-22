import baseApi from '@/common/api/apiBaseQuery';
import { USER_PREFIX } from '@/common/constants/apiPrefixConst';
import { IRegisterRequest, IRegisterResponse } from '@/model/register/RegisterModel';

export const registerService = baseApi.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation<IRegisterResponse, IRegisterRequest>({
      query: request => ({
        url: `${USER_PREFIX}/create`,
        data: request,
      }),
    }),
  }),
});

export const { useRegisterMutation } = registerService;
