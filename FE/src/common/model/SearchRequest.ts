export interface ISearchRequest<T> {
  condition?: T;
  page: number;
  size: number;
  orderList: ISearchOrder[];
}

export interface ISearchOrder {
  orderBy: string;
  direction: string;
}
