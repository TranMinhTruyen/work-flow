import { IBaseResponse } from '@/common/model/BaseResponse';
import { toggleLoading } from '@/common/store/commonSlice';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ResponseType } from 'axios';
import { API_PREFIX } from '../constants/apiPrefixConst';
import { CustomAxiosConfig } from '../constants/typeConst';
import { ApiEnum } from '../enums/ApiEnum';
import { axiosInstance } from '../provider/RootProvider';
import { controller } from './apiUrl';

export const axiosFetch = async (api: ApiEnum, configAxios: CustomAxiosConfig) => {
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
