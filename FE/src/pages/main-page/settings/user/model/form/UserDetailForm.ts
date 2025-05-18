import { IScreenMaster } from '@/common/model/ScreenMaster';

export interface IUserDetailForm {
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
  createBy?: string;
  updateDatetime?: string;
  updateBy?: string;
}
