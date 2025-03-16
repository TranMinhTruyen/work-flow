import baseApi from '@/common/api/apiBaseQuery';
import { ApiEnum } from '@/common/api/apiUrl';
import { IPageRequest, IPageResponse } from '@/common/model/pageable';
import IGetScreenDetail from '@/pages/main-page/master/screen/model/GetScreenDetail';
import ISearchScreenRequest from '@/pages/main-page/master/screen/model/screenRequest';
import ISearchScreenResponse from '@/pages/main-page/master/screen/model/screenResponse';

export const screenService = baseApi.injectEndpoints({
  endpoints: builder => ({
    searchScreen: builder.mutation<
      IPageResponse<ISearchScreenResponse[]>,
      IPageRequest<ISearchScreenRequest>
    >({
      query: request => ({
        api: ApiEnum.SEARCH_SCREEN,
        data: request,
      }),
    }),
    getScreenDetail: builder.query<IGetScreenDetail, { screenId?: string }>({
      query: params => ({
        api: ApiEnum.GET_SCREEN_DETAIL,
        params: params,
      }),
    }),
  }),
});

export const { useSearchScreenMutation, useGetScreenDetailQuery } = screenService;
