import { IUserResponse } from '@/common/model/user';

export default interface ILoginResponse {
  tokenType?: string;
  userResponse?: IUserResponse;
  token?: string;
}
