'use client';
import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import { DATE_TIME_FORMAT, TIME_OUT } from '../constants/commonConst';
import { MessageType } from '../enums/MessageEnum';
import { openPopupDialogContainer } from '@/components/dialog/DialogContainer';
import { getLoginData } from '../utils/authUtil';
import useNavigate from '../hooks/useNavigate';
import ApiErrorDetail from '@/components/error/ApiErrorDetail';
import { ILoginResponse } from '@/model/login/LoginModel';
import { IBaseRequest } from '@/model/common/BaseRequest';
import { LOGIN_URL } from '../constants/urlConst';
import { IBaseResponse } from '@/model/common/BaseResponse';
import { toggleLoading } from '@/lib/slices/commonSlice';
import store, { useAppDispatch } from '@/lib/store';
import moment from 'moment';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: TIME_OUT,
});

const whiteList: string[] = [
  '/api/user-account/login',
  '/api/user-account/create',
  '/api/master-item/get',
  '/api/proxy/check-proxy',
];

const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [isSet, setIsSet] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { navigate } = useNavigate();

  useEffect(() => {
    if (isSet) return;

    axiosInstance.interceptors.request.use(config => {
      if (!whiteList.some(x => x.toLowerCase() === config.url?.toLowerCase())) {
        const loginData: ILoginResponse | undefined = getLoginData();

        // If login data is undefined, back to login screen
        if (loginData === undefined) {
          navigate(LOGIN_URL, true);
        } else {
          // Set token to header
          config.headers['Authorization'] = `Bearer ${loginData.token}`;
        }
      }

      // Transform request
      const clientIp = document.cookie
        .split(';')
        .find(row => row.startsWith('client-ip='))
        ?.split('=')[1];

      if (config.data) {
        const transformRequest: IBaseRequest = {
          timestamp: moment(new Date()).format(DATE_TIME_FORMAT),
          ipAddress:
            process.env.NODE_ENV !== 'production'
              ? '127.0.0.1'
              : decodeURIComponent(clientIp ?? ''),
          language: store.getState().commonState.language,
          payload: config.data,
        };
        config.data = transformRequest;
      }

      // Set loading
      if (!store.getState().commonState.isLoading) {
        dispatch(toggleLoading(true));
        openPopupDialogContainer({
          type: 'loading',
        });
      }

      return config;
    });

    axiosInstance.interceptors.response.use(
      response => {
        const transformResponse: IBaseResponse = response.data;

        // TODO Check warning
        if (transformResponse.messageType !== MessageType.SUCCESS) {
          openPopupDialogContainer({
            title: transformResponse.messageType,
            type: 'message',
            maxWidth: 'sm',
            messageType: transformResponse.messageType,
            message: (
              <ApiErrorDetail
                status={response.status}
                message={transformResponse.message}
                responseData={transformResponse}
              />
            ),
          });
        }

        return response;
      },
      error => {
        let responseStatus = 500;
        let responseMessage = '';

        let responseData: IBaseResponse = {
          timestamp: '',
          messageType: MessageType.ERROR,
          messageCode: '',
          message: '',
          errorList: new Map<string, string>(),
          body: undefined,
        };

        if (error.code === 'ECONNABORTED') {
          responseMessage = 'The connection was interrupted.';
        } else if (!error.response) {
          responseMessage = 'Connected to the Internet or the server may be down.';
        } else {
          responseStatus = error.response.status;
          responseData = error.response.data;

          switch (responseStatus) {
            case 403:
              responseMessage = 'Forbidden';
              break;
            case 404:
              responseMessage = 'Not Found';
              break;
            case 408:
              responseMessage = 'Request Timeout';
              break;
            case 409:
              responseMessage = 'Conflict';
              break;
            case 413:
              responseMessage = 'Payload Too Large';
              break;
            case 429:
              responseMessage = 'Too Many Requests';
              break;
            case 500:
              responseMessage = 'Internal Server Error';
              break;
            case 502:
              responseMessage = 'Bad Gateway';
              break;
            case 503:
              responseMessage = 'Service Unavailable';
              break;
            case 504:
              responseMessage = 'Gateway Timeout';
              break;
            default:
              responseMessage = `An error occurred. HTTP status ${responseStatus}`;
              break;
          }
        }

        openPopupDialogContainer({
          title: responseData.messageType,
          type: 'message',
          maxWidth: 'sm',
          messageType: responseData.messageType,
          isPopup: false,
          message: (
            <ApiErrorDetail
              status={responseStatus}
              message={responseMessage}
              responseData={responseData}
            />
          ),
        });

        return Promise.reject(error);
      }
    );

    setIsSet(true);
  }, [dispatch, isSet, navigate]);

  return <>{isSet && children}</>;
};

export default ApiProvider;
