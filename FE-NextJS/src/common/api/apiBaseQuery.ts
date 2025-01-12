import { toggleLoading } from '@/lib/slices/commonSlice';
import { IBaseResponse } from '@/model/common/BaseResponse';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { AxiosRequestConfig, ResponseType } from 'axios';
import { API_PREFIX } from '../constants/apiPrefixConst';
import { ApiEnum } from '../enums/ApiEnum';
import { axiosInstance } from '../provider/RootProvider';
import { controller } from './apiUrl';

export const axiosFetch = async (api: ApiEnum, configAxios: AxiosRequestConfig) => {
  return await axiosInstance({
    ...configAxios,
    url: `${API_PREFIX}${controller[api].url}`,
    method: controller[api].method,
  });
};

const apiBaseQuery =
  (): BaseQueryFn<
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
        data,
        params,
        responseType,
      };

      const response = await axiosFetch(api, configAxios);

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
  baseQuery: apiBaseQuery(),
  endpoints: () => ({}),
});

export default baseApi;
