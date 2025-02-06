import baseApi from '@/common/api/apiBaseQuery';
import { ApiEnum } from '@/common/enums/ApiEnum';
import { ICheckProxyRequest, ICheckProxyResponse } from '@/common/model/Proxy';

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
