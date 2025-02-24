export interface IBaseRequest<T = any> {
  timestamp?: string;
  language?: string;
  payload?: T;
}
