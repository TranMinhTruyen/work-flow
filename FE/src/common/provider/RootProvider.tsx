import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { openDialogContainer } from '@/components/dialog/DialogContainer';
import ApiErrorDetail from '@/components/error/ApiErrorDetail';
import store, { useAppDispatch } from '@/lib/store';
import { ILoginResponse } from '@/pages/auth-page/login/model/loginModel';

import { axiosInstance } from '../api/axios';
import { FULL_DATE_TIME_FORMAT, RESET_ALL } from '../constants/commonConst';
import { CustomAxiosConfig } from '../constants/typeConst';
import { screenUrl } from '../constants/urlConst';
import { I18nEnum } from '../enums/i18nEnum';
import { MessageType } from '../enums/messageEnum';
import useRouter from '../hooks/useRouter';
import { IBaseRequest, IBaseResponse } from '../model/axiosData';
import { toggleLoading } from '../store/commonSlice';
import { getLoginData } from '../utils/authUtil';
import { isIBaseRequest } from '../utils/convertUtil';
import { formatString } from '../utils/stringUtil';

const FILE_API: string[] = ['/api/file/get-upload-url', '/api/file/get-download-url'];

const AUTH_WHITE_LIST: string[] = [
  '/api/user-account/login',
  '/api/user-account/create',
  '/api/master-item/get',
  ...FILE_API,
];

const RootProvider = ({ children }: { children: ReactNode }) => {
  const [isSet, setIsSet] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { navigate } = useRouter();
  const { t } = useTranslation(I18nEnum.COMMON_I18N);

  useEffect(() => {
    if (isSet) return;

    axiosInstance.interceptors.request.use(config => {
      if (!(config as CustomAxiosConfig).isS3Url) {
        if (!AUTH_WHITE_LIST.some(x => x.toLowerCase() === config.url?.toLowerCase())) {
          const loginData: ILoginResponse | undefined = getLoginData();

          // If login data is undefined, back to login screen
          if (!loginData) {
            navigate(screenUrl.LOGIN.path, true);
          } else {
            // Set token to header
            config.headers['Authorization'] = `Bearer ${loginData.token}`;
          }
        }

        // Transform request
        if (!isIBaseRequest(config.data)) {
          const transformRequest: IBaseRequest = {
            timestamp: dayjs().format(FULL_DATE_TIME_FORMAT),
            language: store.getState().commonState.language,
            payload: { ...config.data },
          };
          config.data = { ...transformRequest };
        }

        // Set loading
        if (
          !FILE_API.some(x => x.toLowerCase() === config.url?.toLowerCase()) ||
          (config as CustomAxiosConfig).isLoading
        ) {
          if (!store.getState().commonState.isLoading) {
            dispatch(toggleLoading(true));
            openDialogContainer({
              type: 'loading',
            });
          }
        }
      }

      return config;
    });

    axiosInstance.interceptors.response.use(
      response => {
        const transformResponse: IBaseResponse = response.data;

        // TODO Check warning
        if (
          transformResponse.messageType &&
          transformResponse.messageType !== MessageType.SUCCESS
        ) {
          openDialogContainer({
            type: 'message',
            maxWidth: 'sm',
            messageType: transformResponse.messageType,
            bodyElement: (
              <ApiErrorDetail
                status={response.status}
                message={transformResponse.message}
                responseData={transformResponse}
              />
            ),
          });
        }

        if (store.getState().commonState.isLoading) {
          dispatch(toggleLoading(false));
        }

        return response;
      },
      error => {
        const axiosError = error as AxiosError<IBaseResponse>;

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
          if (axiosError.response) {
            responseStatus = axiosError.response?.status;
            responseData = axiosError.response?.data;
          }

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

        if (responseStatus === 401) {
          openDialogContainer({
            type: 'message',
            maxWidth: 'sm',
            messageType: responseData.messageType,
            isPopup: false,
            showCloseButton: false,
            autoClose: true,
            timeout: 15,
            onConfirm: () => {
              dispatch({ type: RESET_ALL });
              localStorage.removeItem('login');
              sessionStorage.removeItem('login');
              navigate(screenUrl.LOGIN.path, true);
            },
            bodyElement: 'Session time out',
          });
        } else if (responseStatus === 500) {
          openDialogContainer({
            type: 'message',
            maxWidth: 'sm',
            messageType: responseData.messageType,
            isPopup: false,
            onConfirm: () => {
              dispatch({ type: RESET_ALL });
              localStorage.removeItem('login');
              sessionStorage.removeItem('login');
              navigate(screenUrl.LOGIN.path, true);
            },
            bodyElement: (
              <ApiErrorDetail
                status={responseStatus}
                message={responseMessage}
                responseData={responseData}
              />
            ),
          });
        } else {
          openDialogContainer({
            type: 'message',
            maxWidth: 'sm',
            messageType: responseData.messageType,
            isPopup: false,
            bodyElement: (
              <ApiErrorDetail
                status={responseStatus}
                message={responseMessage}
                responseData={responseData}
              />
            ),
          });
        }

        if (store.getState().commonState.isLoading) {
          dispatch(toggleLoading(false));
        }

        return Promise.reject(error);
      }
    );

    setIsSet(true);
  }, [dispatch, isSet, navigate, t]);

  return <>{isSet && children}</>;
};

export default RootProvider;
