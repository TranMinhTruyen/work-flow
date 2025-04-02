export interface IPageRequest<T = any> {
  condition?: T;
  page: number;
  size: number;
  orderList?: IPageableOrder[];
}

export interface IPageResponse<T = any> {
  page: number;
  size: number;
  from: number;
  to: number;
  total: number;
  totalPages: number;
  result?: T[];
}

export interface IPageableOrder {
  orderBy: string;
  direction: string;
}
