'use client';
import { ILoginResponse } from '@/app/(auth)/login/model/LoginModel';
import i18n from '@/app/i18n';
import { IBaseRequest } from '@/common/model/BaseRequest';
import { IBaseResponse } from '@/common/model/BaseResponse';
import { selectLanguage, toggleLoading } from '@/common/store/commonSlice';
import { openDialogContainer } from '@/components/dialog/DialogContainer';
import ApiErrorDetail from '@/components/error/ApiErrorDetail';
import store, { useAppDispatch, useAppSelector } from '@/lib/store';
import axios from 'axios';
import dayjs from 'dayjs';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DATE_TIME_FORMAT, TIME_OUT } from '../constants/commonConst';
import { CustomAxiosConfig } from '../constants/typeConst';
import { LOGIN_URL } from '../constants/urlConst';
import { I18nEnum } from '../enums/I18nEnum';
import { MessageType } from '../enums/MessageEnum';
import useNavigate from '../hooks/useNavigate';
import { getLoginData } from '../utils/authUtil';
import { formatString } from '../utils/stringUtil';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: TIME_OUT,
});

const whiteList: string[] = [
  '/api/user-account/login',
  '/api/user-account/create',
  '/api/master-item/get',
  '/api/proxy/check-proxy',
  '/api/file/get-upload-url',
  '/api/file/get-download-url',
];

const RootProvider = ({ children }: { children: ReactNode }) => {
  const [isSet, setIsSet] = useState<boolean>(false);
  const firstRef = useRef(true);
  const dispatch = useAppDispatch();
  const { navigate } = useNavigate();
  const { t } = useTranslation(I18nEnum.COMMON_I18N);
  const language = useAppSelector(selectLanguage);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      if (firstRef.current) {
        firstRef.current = false;
        return;
      }
    }

    if (isSet) return;

    axiosInstance.interceptors.request.use(config => {
      if (!(config as CustomAxiosConfig).isFile) {
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
        if (config.data) {
          const transformRequest: IBaseRequest = {
            timestamp: dayjs(new Date()).format(DATE_TIME_FORMAT),
            language: store.getState().commonState.language,
            payload: config.data,
          };
          config.data = transformRequest;
        }

        // Set loading
        if (!store.getState().commonState.isLoading) {
          dispatch(toggleLoading(true));
          openDialogContainer({
            type: 'loading',
          });
        }
      }

      return config;
    });

    axiosInstance.interceptors.response.use(
      response => {
        const transformResponse: IBaseResponse = response.data;

        // TODO Check warning
        if (transformResponse.messageType !== MessageType.SUCCESS) {
          openDialogContainer({
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
          errorList: [],
          body: undefined,
        };

        if (error.code === 'ECONNABORTED') {
          responseMessage = t('network.interrupted');
        } else if (!error.response) {
          responseMessage = t('network.serverDown');
        } else {
          responseStatus = error.response.status;
          responseData = error.response.data;

          switch (responseStatus) {
            case 400:
              responseMessage = t('network.400');
              break;
            case 401:
              responseMessage = t('network.401');
              break;
            case 403:
              responseMessage = t('network.403');
              break;
            case 404:
              responseMessage = t('network.404');
              break;
            case 408:
              responseMessage = t('network.408');
              break;
            case 409:
              responseMessage = t('network.409');
              break;
            case 413:
              responseMessage = t('network.413');
              break;
            case 429:
              responseMessage = t('network.429');
              break;
            case 500:
              responseMessage = t('network.500');
              break;
            case 502:
              responseMessage = t('network.502');
              break;
            case 503:
              responseMessage = t('network.503');
              break;
            case 504:
              responseMessage = t('network.504');
              break;
            default:
              responseMessage = formatString(t('network.default'), responseStatus);
              break;
          }
        }

        openDialogContainer({
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
  }, [dispatch, isSet, navigate, t]);

  return <>{isSet && children}</>;
};

export default RootProvider;
