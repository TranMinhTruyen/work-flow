export interface ILoginResponse {
  tokenType?: string;
  userId?: string;
  token?: string;
}

export interface ILoginRequest {
  username?: string;
  password?: string;
  isRemember?: boolean;
}
