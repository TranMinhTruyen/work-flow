import { FileData } from '@/common/constants/typeConst';

export default interface IRegisterForm {
  userName?: string;
  password?: string;
  email?: string;
  fullName?: string;
  birthDay?: string;
  role?: string;
  authorities?: string[];
  image?: FileData;
}
