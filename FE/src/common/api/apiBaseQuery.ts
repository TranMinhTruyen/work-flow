import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ResponseType } from 'axios';

import { CustomAxiosConfig } from '../constants/typeConst';
import { IBaseResponse } from '../model/axiosData';
import { ApiEnum } from './apiUrl';
import { axiosApiEnumFetch } from './axios';

const apiBaseQuery =
  (): BaseQueryFn<
    {
      api: ApiEnum;
      data?: CustomAxiosConfig['data'];
      params?: CustomAxiosConfig['params'];
      responseType?: ResponseType;
      isLoading?: boolean;
    },
    undefined | null | unknown,
    undefined | null | unknown
  > =>
  async ({ api, data, params, responseType, isLoading = true }) => {
    try {
      const configAxios: CustomAxiosConfig = {
        data,
        params,
        responseType,
        isLoading,
      };

      const response = await axiosApiEnumFetch(api, configAxios);

      const responseData: IBaseResponse = response.data;

      return { data: responseData.body, error: '', meta: undefined };
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    } catch (error) {
      return { data: undefined, error: '', meta: undefined };
    }
  };

const baseApi = createApi({
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 0.0001,
  reducerPath: 'baseApi',
  baseQuery: apiBaseQuery(),
  endpoints: () => ({}),
});

export default baseApi;
