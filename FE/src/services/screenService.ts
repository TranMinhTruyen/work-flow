import baseApi from '@/common/api/apiBaseQuery';
import { ApiEnum } from '@/common/enums/ApiEnum';
import { IPageRequest, IPageResponse } from '@/common/model/Pageable';
import { ISearchScreenRequest } from '@/pages/main-page/master/screen/model/ScreenRequest';
import { ISearchScreenResponse } from '@/pages/main-page/master/screen/model/ScreenResponse';

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
  }),
});

export const { useSearchScreenMutation } = screenService;
