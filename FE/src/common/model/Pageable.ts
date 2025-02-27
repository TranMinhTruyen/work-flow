export interface IPageRequest<T> {
  condition?: T;
  page: number;
  size: number;
  orderList: IPageableOrder[];
}

export interface IPageResponse<T> {
  page: number;
  size: number;
  total: number;
  result?: T;
}

export interface IPageableOrder {
  orderBy: string;
  direction: string;
}
