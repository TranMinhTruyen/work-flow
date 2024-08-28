import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { TIME_OUT } from 'common/constants/commonConst';
import IBaseResponse from '../api/baseResponse';
import { selectIsLoading, selectLoginData, toggleLoading } from 'common/commonSlice';
import { openDialogContainer } from 'components/dialog/DialogContainer';
import { ILoginResponse } from 'model/login/LoginModel';
import { MessageType } from 'common/enums/MessageEnum';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: process.env.SERVER_URL,
  timeout: TIME_OUT,
});

const whiteList: string[] = ['/api/user-account/login'];

export const ApiProvider = ({ children }: { children: React.ReactElement }) => {
  const [isSet, setIsSet] = useState<boolean>(false);
  const isLoading: boolean = useAppSelector(selectIsLoading);
  const loginData: ILoginResponse | undefined = useAppSelector(selectLoginData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSet) return;

    axiosInstance.interceptors.request.use(config => {
      if (!whiteList.some(x => x.toLowerCase() === config.url?.toLowerCase())) {
        // If login data is undefined, back to login screen
        if (loginData === undefined) {
          navigate('/auth/login', { replace: true });
        } else {
          // Set token to header
          config.headers['Authorization'] = `Bearer ${loginData.token}`;
        }
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

        if (transformResponse.messageType !== MessageType.SUCCESS) {
          throw Error(JSON.stringify(transformResponse));
        }

        return response;
      },
      error => {
        let dialogMessage = '';
        if (error.code === 'ECONNABORTED') {
          dialogMessage = 'The connection was interrupted.';
        } else if (!error.response) {
          dialogMessage =
            'A communication error occurred. You may not be connected to the Internet or the server may be down.';
        } else {
          const status = error.response.status;
          switch (status) {
            case 403:
              dialogMessage = 'Forbidden';
              break;
            case 404:
              dialogMessage = 'Not Found';
              break;
            case 408:
              dialogMessage = 'Request Timeout';
              break;
            case 409:
              dialogMessage = 'Conflict';
              break;
            case 413:
              dialogMessage = 'Payload Too Large';
              break;
            case 429:
              dialogMessage = 'Too Many Requests';
              break;
            case 500:
              dialogMessage = 'Internal Server Error';
              break;
            case 502:
              dialogMessage = 'Bad Gateway';
              break;
            case 503:
              dialogMessage = 'Service Unavailable';
              break;
            case 504:
              dialogMessage = 'Gateway Timeout';
              break;
            default:
              dialogMessage = `An error occurred. \nHTTP status ${status}`;
              break;
          }
        }

        openDialogContainer({
          type: 'message',
          title: 'Error',
          messageType: MessageType.ERROR,
          message: dialogMessage,
          onConfirm: () => {},
        });

        return Promise.reject(error);
      }
    );

    setIsSet(true);
  }, [dispatch, isLoading, isSet, loginData]);

  return <>{isSet && children}</>;
};

export default axiosInstance;
