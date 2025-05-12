/* eslint-disable no-unused-vars */
import {
  FILE_PREFIX,
  NOTIFICATION_PREFIX,
  SCREEN_PREFIX,
  SECURITY_PREFIX,
  USER_PREFIX,
} from '../constants/apiPrefixConst';
import { ApiType } from '../constants/typeConst';

export enum ApiEnum {
  // User api
  CREATE_USER_ADMIN,
  CREATE_USER,
  LOGIN,
  GET_USER_PROFILE,
  UPDATE_USER_ACCOUNT,
  CHANGE_LOGIN_PASSWORD,

  // Master item api
  CREATE_MASTER,

  // Proxy api
  TOKEN_CHECK,
  GET_ACCESS_SCREEN,

  // File api
  UPLOAD_FILE,
  DOWNLOAD_FILE,
  DELETE_FILE,

  // Notification api
  GET_NOTIFICATION,
  SET_IS_READ,

  // Screen api
  SEARCH_SCREEN,
  GET_SCREEN_DETAIL,
  GET_SCREEN_USERS,
  REMOVE_USER,
  SAVE_SCREEN,
  GET_USERS_NOT_USING,
  ASSIGN_USER,
}

export const controller: Record<string, ApiType> = {
  // User api
  [ApiEnum.LOGIN]: {
    url: `${USER_PREFIX}/login`,
    method: 'POST',
  },
  [ApiEnum.CREATE_USER_ADMIN]: {
    url: `${USER_PREFIX}/create-user-for-admin`,
    method: 'POST',
  },
  [ApiEnum.CREATE_USER]: {
    url: `${USER_PREFIX}/create-user`,
    method: 'POST',
  },
  [ApiEnum.GET_USER_PROFILE]: {
    url: `${USER_PREFIX}/get-user`,
    method: 'POST',
  },
  [ApiEnum.UPDATE_USER_ACCOUNT]: {
    url: '',
    method: 'POST',
  },
  [ApiEnum.CHANGE_LOGIN_PASSWORD]: {
    url: '',
    method: 'POST',
  },
  [ApiEnum.CREATE_MASTER]: {
    url: '',
    method: 'POST',
  },

  // Security api
  [ApiEnum.TOKEN_CHECK]: {
    url: `${SECURITY_PREFIX}/token-check`,
    method: 'POST',
  },
  [ApiEnum.GET_ACCESS_SCREEN]: {
    url: `${SECURITY_PREFIX}/get-access-screen`,
    method: 'POST',
  },

  // File api
  [ApiEnum.UPLOAD_FILE]: {
    url: `${FILE_PREFIX}/get-upload-url`,
    method: 'POST',
  },
  [ApiEnum.DOWNLOAD_FILE]: {
    url: `${FILE_PREFIX}/get-download-url`,
    method: 'POST',
  },
  [ApiEnum.DELETE_FILE]: {
    url: `${FILE_PREFIX}/delete-file`,
    method: 'POST',
  },

  // Notification api
  [ApiEnum.GET_NOTIFICATION]: {
    url: `${NOTIFICATION_PREFIX}/get-notification`,
    method: 'POST',
  },
  [ApiEnum.SET_IS_READ]: {
    url: `${NOTIFICATION_PREFIX}/set-is-read`,
    method: 'PUT',
  },

  // Screen api
  [ApiEnum.SEARCH_SCREEN]: {
    url: `${SCREEN_PREFIX}/search`,
    method: 'POST',
  },
  [ApiEnum.GET_SCREEN_DETAIL]: {
    url: `${SCREEN_PREFIX}/get-screen-detail`,
    method: 'GET',
  },
  [ApiEnum.GET_SCREEN_USERS]: {
    url: `${SCREEN_PREFIX}/get-screen-users`,
    method: 'POST',
  },
  [ApiEnum.REMOVE_USER]: {
    url: `${SCREEN_PREFIX}/remove-user-from-screen`,
    method: 'POST',
  },
  [ApiEnum.SAVE_SCREEN]: {
    url: `${SCREEN_PREFIX}/save-screen`,
    method: 'POST',
  },
  [ApiEnum.GET_USERS_NOT_USING]: {
    url: `${SCREEN_PREFIX}/get-users-not-using`,
    method: 'POST',
  },
  [ApiEnum.ASSIGN_USER]: {
    url: `${SCREEN_PREFIX}/assign-user`,
    method: 'PUT',
  },
};
