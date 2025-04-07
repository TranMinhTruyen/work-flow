import baseApi from '@/common/api/apiBaseQuery';
import { ApiEnum } from '@/common/api/apiUrl';
import { IPageRequest, IPageResponse } from '@/common/model/Pageable';
import IGetScreenDetail from '@/pages/main-page/settings/screen/model/GetScreenDetail';
import IRemoveUserRequest from '@/pages/main-page/settings/screen/model/RemoveUserRequest';
import IRemoveUserResponse from '@/pages/main-page/settings/screen/model/RemoveUserResponse';
import ISaveScreenRequest from '@/pages/main-page/settings/screen/model/SaveScreenRequest';
import ISaveScreenResponse from '@/pages/main-page/settings/screen/model/SaveScreenResponse';
import IScreenUserRequest from '@/pages/main-page/settings/screen/model/ScreenUserRequest';
import IScreenUserResponse from '@/pages/main-page/settings/screen/model/ScreenUserResponse';
import ISearchScreenRequest from '@/pages/main-page/settings/screen/model/SearchScreenRequest';
import ISearchScreenResponse from '@/pages/main-page/settings/screen/model/SearchScreenResponse';

export const screenService = baseApi.injectEndpoints({
  endpoints: builder => ({
    searchScreen: builder.mutation<
      IPageResponse<ISearchScreenResponse>,
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

    getScreenUsers: builder.query<
      IPageResponse<IScreenUserResponse>,
      IPageRequest<IScreenUserRequest>
    >({
      query: request => ({
        api: ApiEnum.GET_SCREEN_USERS,
        data: request,
        isLoading: false,
      }),
    }),

    removeUser: builder.query<IRemoveUserResponse, IRemoveUserRequest>({
      query: request => ({
        api: ApiEnum.REMOVE_USER,
        data: request,
        isLoading: false,
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
