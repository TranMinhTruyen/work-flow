/* eslint-disable no-unused-vars */

export enum UserApi {
  CREATE = 'CREATE_USER',
  LOGIN = 'LOGIN',
  GET_PROFILE = 'GET_PROFILE',
  UPDATE_USER_ACCOUNT = 'UPDATE_USER_ACCOUNT',
  CHANGE_LOGIN_PASSWORD = 'CHANGE_LOGIN_PASSWORD',
}

export enum MasterApi {
  CREATE = 'CREATE_MASTER',
}

export enum ProxyApi {
  CHECK_PROXY = 'CHECK_PROXY',
}

export type Api = UserApi | MasterApi | ProxyApi;
