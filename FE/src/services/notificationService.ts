import baseApi from '@/common/api/apiBaseQuery';
import { ApiEnum } from '@/common/api/apiUrl';
import {
  IAllNotificationResponse,
  INotificationCreateRequest,
  INotificationResponse,
} from '@/common/model/Notification';
import { IPageRequest } from '@/common/model/Pageable';

export const notificationService = baseApi.injectEndpoints({
  endpoints: builder => ({
    createNotification: builder.mutation<INotificationResponse, INotificationCreateRequest>({
      query: request => ({
        api: ApiEnum.CREATE_NOTIFICATION,
        data: request,
      }),
    }),
    getNotification: builder.mutation<IAllNotificationResponse, IPageRequest>({
      query: request => ({
        api: ApiEnum.GET_NOTIFICATION,
        data: request,
        isLoading: false,
      }),
    }),
    setIsRead: builder.mutation<INotificationResponse, { id: string }>({
      query: params => ({
        api: ApiEnum.SET_IS_READ,
        params: params,
      }),
    }),
  }),
});
