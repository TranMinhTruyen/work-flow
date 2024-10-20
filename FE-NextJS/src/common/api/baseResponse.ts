import { MessageType } from '../enums/messageEnums';

export interface IBaseResponse {
  timestamp: string;
  messageType: MessageType;
  messageCode: string;
  message: string;
  errorList: Map<string, string>;
  body: any;
}
