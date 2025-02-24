import baseApi from '@/common/api/apiBaseQuery';
import { ApiEnum } from '@/common/enums/ApiEnum';
import { ICheckProxyRequest, ICheckProxyResponse } from '@/common/model/Proxy';
import { IAccessScreenResponse } from '@/common/model/ScreenMaster';

export const proxyService = baseApi.injectEndpoints({
  endpoints: builder => ({
    checkProxy: builder.mutation<ICheckProxyResponse, ICheckProxyRequest>({
      query: request => ({
        api: ApiEnum.CHECK_PROXY,
        data: request,
      }),
    }),
    getAccessScreen: builder.mutation<IAccessScreenResponse, void>({
      query: () => ({
        api: ApiEnum.GET_ACCESS_SCREEN,
      }),
    }),
  }),
});

export const { useCheckProxyMutation, useGetAccessScreenMutation } = proxyService;
