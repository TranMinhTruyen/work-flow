import baseApi from '@/common/api/apiBaseQuery';
import { ICheckProxyRequest, ICheckProxyResponse } from '@/common/auth/model/ProxyModel';
import { ApiEnum } from '@/common/enums/ApiEnum';

export const proxyService = baseApi.injectEndpoints({
  endpoints: builder => ({
    checkProxy: builder.mutation<ICheckProxyResponse, ICheckProxyRequest>({
      query: request => ({
        api: ApiEnum.CHECK_PROXY,
        data: request,
      }),
    }),
  }),
});

export const { useCheckProxyMutation } = proxyService;
