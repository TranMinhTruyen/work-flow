import { FileData } from '@/common/model/FileData';

export interface IRegisterRequest {
  userName?: string;
  password?: string;
  email?: string;
  fullName?: string;
  birthDay?: string;
  role?: string;
  authorities?: string[];
  level?: number;
  image?: FileData;
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
