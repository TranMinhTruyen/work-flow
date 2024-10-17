import { IUserResponse } from '../user/userModel';

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
