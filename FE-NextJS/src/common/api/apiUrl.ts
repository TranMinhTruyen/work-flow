import { FILE_PREFIX, PROXY_PREFIX, USER_PREFIX } from '../constants/apiPrefixConst';
import { ApiType } from '../constants/typeConst';
import { ApiEnum } from '../enums/ApiEnum';

export const controller: Record<ApiEnum, ApiType> = {
  // User api
  [ApiEnum.LOGIN]: {
    url: `${USER_PREFIX}/login`,
    method: 'POST',
  },
  [ApiEnum.CREATE_USER]: {
    url: `${USER_PREFIX}/create`,
    method: 'POST',
  },
  [ApiEnum.GET_PROFILE]: {
    url: '',
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

  // Proxy api
  [ApiEnum.CHECK_PROXY]: {
    url: `${PROXY_PREFIX}/check-proxy`,
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
};
