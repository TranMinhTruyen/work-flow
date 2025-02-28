import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ResponseType } from 'axios';
import { CustomAxiosConfig } from '../constants/typeConst';
import { IBaseResponse } from '../model/baseResponse';
import { axiosApiEnumFetch } from '../provider/RootProvider';
import { ApiEnum } from './apiUrl';

const apiBaseQuery =
  (): BaseQueryFn<
    {
      api: ApiEnum;
      data?: CustomAxiosConfig['data'];
      params?: CustomAxiosConfig['params'];
      responseType?: ResponseType;
    },
    undefined | null | unknown,
    undefined | null | unknown
  > =>
  async ({ api, data, params, responseType }, { dispatch }) => {
    try {
      const configAxios: CustomAxiosConfig = {
        data,
        params,
        responseType,
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
