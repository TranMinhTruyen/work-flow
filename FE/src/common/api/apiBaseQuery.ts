import { AxiosRequestConfig, ResponseType } from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import IBaseResponse from './baseResponse';
import { openDialogContainer } from 'components/dialog/DialogContainer';
import { toggleLoading } from 'common/commonSlice';
import axiosInstance from '../provider/ApiProvider';

const apiBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string;
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      responseType?: ResponseType;
    },
    undefined | null | unknown,
    undefined | null | unknown
  > =>
  async ({ url, data, params, responseType }, { dispatch }) => {
    try {
      const configAxios: AxiosRequestConfig = {
        url: baseUrl + url,
        method: 'POST',
        data: data,
        params,
        responseType,
        timeout: 180000,
      };

      openDialogContainer({
        type: 'loading',
        onConfirm: () => {},
      });

      const response = await axiosInstance(configAxios);

      const responseData: IBaseResponse = response.data;

      return { data: responseData.body };
    } catch (axiosError) {
      dispatch(toggleLoading(false));
      return { error: undefined };
    } finally {
      dispatch(toggleLoading(false));
    }
  };

const baseApi = createApi({
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 0.0001,
  reducerPath: 'baseApi',
  baseQuery: apiBaseQuery({ baseUrl: '/api' }),
  endpoints: () => ({}),
});

export default baseApi;