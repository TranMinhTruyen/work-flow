import { FileData } from '@/common/model/FileData';

export interface IRegisterForm {
  userName?: string;
  password?: string;
  email?: string;
  fullName?: string;
  birthDay?: string;
  role?: string;
  authorities?: string[];
  image?: FileData;
}
