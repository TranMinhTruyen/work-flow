import baseApi from '@/common/api/apiBaseQuery';
import { ApiEnum } from '@/common/enums/ApiEnum';
import { IAccessScreenResponse } from '@/common/model/ScreenMaster';

export const proxyService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAccessScreen: builder.mutation<IAccessScreenResponse, void>({
      query: () => ({
        api: ApiEnum.GET_ACCESS_SCREEN,
      }),
    }),
  }),
});

export const { useGetAccessScreenMutation } = proxyService;
