import { FileInputData } from '../../common/constants/type';

export interface IRegisterForm {
  userName?: string;
  password?: string;
  email?: string;
  fullName?: string;
  birthDay?: string;
  role?: string;
  authorities?: string[];
  image?: FileInputData;
}
