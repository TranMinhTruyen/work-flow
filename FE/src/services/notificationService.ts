import baseApi from '@/common/api/apiBaseQuery';
import { ApiEnum } from '@/common/api/apiUrl';
import { IAllNotificationResponse, INotificationResponse } from '@/common/model/Notification';
import { IPageRequest } from '@/common/model/Pageable';

export const notificationService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNotification: builder.mutation<IAllNotificationResponse, IPageRequest>({
      query: request => ({
        api: ApiEnum.GET_NOTIFICATION,
        data: request,
        isLoading: false,
      }),
    }),
    setIsRead: builder.mutation<INotificationResponse, { id: string; language: string }>({
      query: params => ({
        api: ApiEnum.SET_IS_READ,
        params: params,
      }),
    }),
  }),
});
