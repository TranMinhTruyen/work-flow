export interface ILoginResponse {
  tokenType?: string;
  userId?: string;
  token?: string;
}

export interface ILoginRequest {
  userName?: string;
  password?: string;
  isRemember?: boolean;
}
