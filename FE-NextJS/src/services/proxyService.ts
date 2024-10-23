import baseApi from '@/common/api/apiBaseQuery';
import { ProxyApi } from '@/common/enums/ApiEnum';
import { ICheckProxyRequest, ICheckProxyResponse } from '@/model/proxy/ProxyModel';

export const proxyService = baseApi.injectEndpoints({
  endpoints: builder => ({
    checkProxy: builder.mutation<ICheckProxyResponse, ICheckProxyRequest>({
      query: request => ({
        api: ProxyApi.CHECK_PROXY,
        data: request,
      }),
    }),
  }),
});

export const { useCheckProxyMutation } = proxyService;
