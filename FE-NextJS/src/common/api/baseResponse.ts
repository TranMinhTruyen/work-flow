/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface IBaseResponse {
  timestamp: string;
  messageType: string;
  messageCode: string;
  message: string;
  body: any;
}
