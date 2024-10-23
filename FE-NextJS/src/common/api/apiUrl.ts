import { PROXY_PREFIX, USER_PREFIX } from '../constants/apiPrefixConst';
import { ApiType } from '../constants/typeConst';

export const controller: Record<string, ApiType> = {
  LOGIN: { url: `${USER_PREFIX}/login`, method: 'POST' },
  CREATE_USER: { url: `${USER_PREFIX}/create`, method: 'POST' },
  CHECK_PROXY: { url: `${PROXY_PREFIX}/check-proxy`, method: 'POST' },
};
