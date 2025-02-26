export interface ISearchRequest<T> {
  condition?: T;
  page: number;
  size: number;
  searchOrderList: ISearchOrder[];
}

export interface ISearchOrder {
  orderBy: string;
  direction: string;
}
