import baseApi from '@/common/api/apiBaseQuery';
import { ApiEnum } from '@/common/api/apiUrl';
import { IAccessScreenResponse } from '@/common/model/ScreenMaster';

export const securityService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAccessScreen: builder.mutation<IAccessScreenResponse, void>({
      query: () => ({
        api: ApiEnum.GET_ACCESS_SCREEN,
      }),
    }),
  }),
});

export const { useGetAccessScreenMutation } = securityService;
