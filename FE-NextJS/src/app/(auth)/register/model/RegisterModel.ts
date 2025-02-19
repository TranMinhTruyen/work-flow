import { NullString } from '@/common/constants/typeConst';

export interface IRegisterRequest {
  userName?: string;
  password?: string;
  email?: string;
  fullName?: string;
  birthDay?: string;
  role?: string;
  authorities?: string[];
  level?: number;
  image?: NullString;
}

export interface IRegisterResponse {
  userName?: string;
  fullName?: string;
  birthDay?: string;
  role?: string;
  authorities?: string[];
  level?: number;
  imagePath?: string;
  createDatetime?: string;
  createdBy?: string;
  updateDatetime?: string;
  updateBy?: string;
}
