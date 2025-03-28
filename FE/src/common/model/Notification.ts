import { IPageResponse } from './Pageable';

export interface INotificationResponse {
  title?: string;
  message?: string;
  sendDatetime?: string;
  sendBy?: string;
  read?: boolean;
}

export interface INotificationCreateRequest {
  userId?: string;
  title?: string;
  message?: string;
  sendBy?: string;
  read?: boolean;
}

export interface IAllNotificationResponse {
  notification?: IPageResponse<INotificationResponse[]>;
  totalNotRead?: number;
}
