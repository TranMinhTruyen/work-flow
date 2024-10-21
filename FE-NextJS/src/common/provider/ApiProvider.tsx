'use client';
import axios from 'axios';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { TIME_OUT } from '../constants/commonConst';
import store, { useAppDispatch, useAppSelector } from '../store';
import { IBaseResponse } from '../../model/common/BaseResponse';
import { MessageType } from '../enums/MessageEnum';
import { openPopupDialogContainer } from '@/components/dialog/DialogContainer';
import { selectIsLoading, toggleLoading } from '../commonSlice';
import { getLoginData } from '../utils/authUtil';
import useNavigate from '../hooks/useNavigate';
import ApiErrorDetail from '@/components/error/ApiErrorDetail';
import { ILoginResponse } from '@/model/login/LoginModel';
import { IBaseRequest } from '@/model/common/BaseRequest';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: TIME_OUT,
});

const whiteList: string[] = [
  '/api/user-account/login',
  '/api/user-account/create',
  '/api/master-item/get',
];

const ApiProvider = ({ children }: { children: ReactElement | ReactNode }) => {
  const [isSet, setIsSet] = useState<boolean>(false);
  const isLoading: boolean = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();
  const { navigate } = useNavigate();

  useEffect(() => {
    if (isSet) return;

    axiosInstance.interceptors.request.use(config => {
      if (!whiteList.some(x => x.toLowerCase() === config.url?.toLowerCase())) {
        const loginData: ILoginResponse | undefined = getLoginData();

        // If login data is undefined, back to login screen
        if (loginData === undefined) {
          navigate('/login', true);
        } else {
          // Set token to header
          config.headers['Authorization'] = `Bearer ${loginData.token}`;
        }
      }

      // Transform request
      if (config.data) {
        const transformRequest: IBaseRequest = {
          language: store.getState().commonState.language,
          payload: config.data,
        };
        config.data = transformRequest;
      }

      // Set loading
      if (!isLoading) {
        dispatch(toggleLoading(true));
      }
      return config;
    });

    axiosInstance.interceptors.response.use(
      response => {
        if (isLoading) {
          dispatch(toggleLoading(false));
        }

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
  }, [dispatch, isLoading, isSet, navigate]);

  return <>{isSet && children}</>;
};

export default ApiProvider;
