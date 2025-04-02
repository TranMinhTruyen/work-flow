import { IScreenMaster } from '@/common/model/ScreenMaster';

export default interface ILoginResponse {
  tokenType?: string;
  userResponse?: IUserResponse;
  token?: string;
}

export interface IUserResponse {
  userId?: string;
  email?: string;
  userName?: string;
  fullName?: string;
  birthDay?: string;
  role?: string;
  loginFailCount?: string;
  isActive?: boolean;
  authorities?: string[];
  level?: number;
  screenMasterList?: IScreenMaster[];
  image?: string;
  createDatetime?: string;
  updateDatetime?: string;
}
