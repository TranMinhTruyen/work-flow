import { FileData } from '../../common/constants/type';

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
  image?: FileData;
  createDatetime?: string;
  updateDatetime?: string;
}
