import axios from 'axios';

import { API_PREFIX } from '../constants/apiPrefixConst';
import { SERVER_URL, TIME_OUT } from '../constants/commonConst';
import { CustomAxiosConfig } from '../constants/typeConst';
import { ApiEnum, controller } from './apiUrl';

export const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  timeout: TIME_OUT,
});

export const axiosFetch = (configAxios: CustomAxiosConfig) => {
  const config: CustomAxiosConfig = {
    isLoading: true,
    ...configAxios,
  };
  return axiosInstance(config);
};

export const axiosApiEnumFetch = (api: ApiEnum, configAxios: CustomAxiosConfig) => {
  const config: CustomAxiosConfig = {
    isLoading: true,
    ...configAxios,
  };
  return axiosInstance({
    ...config,
    url: `${API_PREFIX}${controller[api].url}`,
    method: controller[api].method,
  });
};
