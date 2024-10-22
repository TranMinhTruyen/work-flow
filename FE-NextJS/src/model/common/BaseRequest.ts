export interface IBaseRequest {
  timestamp?: string;
  ipAddress?: string | null;
  macAddress?: string | null;
  language?: string;
  payload?: any;
}
