export interface IBaseResponse {
  timestamp: string;
  messageType: string;
  messageCode: string;
  message: string;
  errorList: Map<string, string>;
  body: any;
}
