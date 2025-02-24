import { IScreenMaster } from './ScreenMaster';

export interface IUserResponse {
  userId?: string;
  email?: string;
  username?: string;
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
