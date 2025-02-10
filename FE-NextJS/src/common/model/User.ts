import { FileData } from './FileData';

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
  accessScreenList?: string[];
  image?: FileData;
  createDatetime?: string;
  updateDatetime?: string;
}
