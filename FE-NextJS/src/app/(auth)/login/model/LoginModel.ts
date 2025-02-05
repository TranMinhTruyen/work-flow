import { IUserResponse } from '@/common/model/User';

export interface ILoginResponse {
  tokenType?: string;
  userResponse?: IUserResponse;
  token?: string;
}

export interface ILoginRequest {
  userName?: string;
  password?: string;
  isRemember?: boolean;
}
