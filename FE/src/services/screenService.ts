import baseApi from '@/common/api/apiBaseQuery';
import { ApiEnum } from '@/common/api/apiUrl';
import { IPageRequest, IPageResponse } from '@/common/model/pageable';
import { ISearchScreenRequest } from '@/pages/main-page/master/screen/model/screenRequest';
import { ISearchScreenResponse } from '@/pages/main-page/master/screen/model/screenResponse';

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
