import baseApi from '@/common/api/apiBaseQuery';
import { ApiEnum } from '@/common/api/apiUrl';
import { IAccessScreenResponse } from '@/common/model/screenMaster';

export const securityService = baseApi.injectEndpoints({
  endpoints: builder => ({
    tokenCheck: builder.mutation<void, void>({
      query: () => ({
        api: ApiEnum.TOKEN_CHECK,
      }),
    }),
    getAccessScreen: builder.mutation<IAccessScreenResponse, void>({
      query: () => ({
        api: ApiEnum.GET_ACCESS_SCREEN,
      }),
    }),
  }),
});

export const { useGetAccessScreenMutation, useTokenCheckMutation } = securityService;
