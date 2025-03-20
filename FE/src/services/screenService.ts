import baseApi from '@/common/api/apiBaseQuery';
import { ApiEnum } from '@/common/api/apiUrl';
import { IPageRequest, IPageResponse } from '@/common/model/pageable';
import IGetScreenDetail from '@/pages/main-page/settings/screen/model/GetScreenDetail';
import ISaveScreenRequest from '@/pages/main-page/settings/screen/model/SaveScreenRequest';
import ISaveScreenResponse from '@/pages/main-page/settings/screen/model/SaveScreenResponse';
import ISearchScreenRequest from '@/pages/main-page/settings/screen/model/SearchScreenRequest';
import ISearchScreenResponse from '@/pages/main-page/settings/screen/model/SearchScreenResponse';

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
    saveScreen: builder.query<ISaveScreenResponse, ISaveScreenRequest>({
      query: request => ({
        api: ApiEnum.SAVE_SCREEN,
        data: request,
      }),
    }),
  }),
});

export const { useSearchScreenMutation, useGetScreenDetailQuery } = screenService;
