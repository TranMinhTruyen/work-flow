import { IPageResponse } from './Pageable';

export interface INotificationResponse {
  id?: string;
  title?: string;
  category?: string;
  message?: string;
  sendDatetime?: string;
  sendBy?: string;
  read?: boolean;
}

export interface IAllNotificationResponse {
  notification?: IPageResponse<INotificationResponse>;
  totalNotRead?: number;
}
