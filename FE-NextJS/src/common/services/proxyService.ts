import { ApiEnum } from '@/common/enums/ApiEnum';
import { ICheckProxyRequest, ICheckProxyResponse } from '@/common/model/Proxy';
import baseApi from '../api/apiBaseQuery';
import { IAccessScreenResponse } from '../model/ScreenMaster';

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
