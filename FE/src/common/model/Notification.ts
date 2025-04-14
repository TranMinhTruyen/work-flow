import { IPageResponse } from './Pageable';

export interface INotificationContentResponse {
  language?: string;
  title?: string;
  message?: string;
}

export interface INotificationResponse {
  id?: string;
  title?: string;
  category?: string;
  message?: string;
  sendDatetime?: string;
  sendBy?: string;
  read?: boolean;
}

export interface INotificationCreateRequest {
  userId?: string;
  contentList?: INotificationContentResponse[];
  sendBy?: string;
  read?: boolean;
}

export interface IAllNotificationResponse {
  notification?: IPageResponse<INotificationResponse>;
  totalNotRead?: number;
}
