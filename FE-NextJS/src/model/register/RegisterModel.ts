import { FileData } from '@/common/constants/type';

export interface IRegisterRequest {
  userName?: string;
  password?: string;
  email?: string;
  fullName?: string;
  birthDay?: string;
  role?: string;
  authorities?: string[];
  image?: FileData;
}

export interface IRegisterResponse {
  userName?: string;
  fullName?: string;
  birthDay?: string;
  role?: string;
  authorities?: string[];
  imagePath?: string;
  createDatetime?: string;
  createdBy?: string;
  updateDatetime?: string;
  updateBy?: string;
}
