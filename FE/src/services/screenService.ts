import baseApi from '@/common/api/apiBaseQuery';
import { ApiEnum } from '@/common/api/apiUrl';
import { IPageRequest, IPageResponse } from '@/common/model/Pageable';
import IGetScreenDetail from '@/pages/main-page/settings/screen/model/form/GetScreenDetail';
import IAssignUserRequest from '@/pages/main-page/settings/screen/model/request/AssignUserRequest';
import IRemoveUserRequest from '@/pages/main-page/settings/screen/model/request/RemoveUserRequest';
import ISaveScreenRequest from '@/pages/main-page/settings/screen/model/request/SaveScreenRequest';
import IScreenUserRequest from '@/pages/main-page/settings/screen/model/request/ScreenUserRequest';
import ISearchScreenRequest from '@/pages/main-page/settings/screen/model/request/SearchScreenRequest';
import IAssignUserResponse from '@/pages/main-page/settings/screen/model/response/AssignUserResponse';
import IRemoveUserResponse from '@/pages/main-page/settings/screen/model/response/RemoveUserResponse';
import ISaveScreenResponse from '@/pages/main-page/settings/screen/model/response/SaveScreenResponse';
import IScreenUserResponse from '@/pages/main-page/settings/screen/model/response/ScreenUserResponse';
import ISearchScreenResponse from '@/pages/main-page/settings/screen/model/response/SearchScreenResponse';

export const screenService = baseApi.injectEndpoints({
  endpoints: builder => ({
    searchScreen: builder.mutation<
      IPageResponse<ISearchScreenResponse>,
      IPageRequest<ISearchScreenRequest>
    >({
      query: request => ({
        api: ApiEnum.SEARCH_SCREEN,
        data: request,
        isLoading: false,
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

    getUsersNotUsing: builder.query<
      IPageResponse<IScreenUserResponse>,
      IPageRequest<IScreenUserRequest>
    >({
      query: request => ({
        api: ApiEnum.GET_USERS_NOT_USING,
        data: request,
        isLoading: false,
      }),
    }),

    assignUser: builder.query<IAssignUserResponse, IAssignUserRequest>({
      query: request => ({
        api: ApiEnum.ASSIGN_USER,
        data: request,
      }),
    }),
  }),
});

export const { useSearchScreenMutation, useGetScreenDetailQuery } = screenService;
