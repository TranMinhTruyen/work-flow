import { toggleLoading } from '@/lib/slices/commonSlice';
import { IBaseResponse } from '@/model/common/BaseResponse';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { AxiosRequestConfig, ResponseType } from 'axios';
import { API_PREFIX } from '../constants/apiPrefixConst';
import { ApiEnum } from '../enums/ApiEnum';
import { axiosInstance } from '../provider/ApiProvider';
import { controller } from './apiUrl';

const apiBaseQuery =
  (
    baseUrl: string = ''
  ): BaseQueryFn<
    {
      api: ApiEnum;
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      responseType?: ResponseType;
    },
    undefined | null | unknown,
    undefined | null | unknown
  > =>
  async ({ api, data, params, responseType }, { dispatch }) => {
    try {
      const configAxios: AxiosRequestConfig = {
        url: baseUrl.concat(controller[api].url),
        method: controller[api].method,
        data,
        params,
        responseType,
        timeout: 180000,
      };

      const response = await axiosInstance(configAxios);

      const responseData: IBaseResponse = response.data;

      return { data: responseData.body, error: '', meta: undefined };
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    } catch (error) {
      return { data: undefined, error: '', meta: undefined };
    } finally {
      dispatch(toggleLoading(false));
    }
  };

const baseApi = createApi({
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 0.0001,
  reducerPath: 'baseApi',
  baseQuery: apiBaseQuery(API_PREFIX),
  endpoints: () => ({}),
});

export default baseApi;
