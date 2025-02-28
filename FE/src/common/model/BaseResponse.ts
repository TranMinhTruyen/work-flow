import { MessageType } from '@/common/enums/messageEnum';

export interface IErrorList {
  errorCode: string;
  errorMessage: any;
}

export interface IBaseResponse<T = any> {
  timestamp: string;
  messageType: MessageType;
  messageCode: string;
  message: string;
  errorList: IErrorList[];
  body: T;
}
