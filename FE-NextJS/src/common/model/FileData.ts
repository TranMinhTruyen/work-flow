import { FileType } from '../constants/typeConst';

export interface FileData {
  file?: File;
  name?: string;
  data?: FileType;
}
