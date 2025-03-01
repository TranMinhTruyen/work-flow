import { Column } from 'ag-grid-community';
import { useCallback, useEffect, useState } from 'react';
import { IPageableOrder } from '../model/pageable';

export type GetPageable = {
  page: number;
  size: number;
  orderList: IPageableOrder[];
};

export type SetPageable = {
  page: number;
  size: number;
  total: number;
  totalPages: number;
};

export type UseGridTableProps = {
  page?: number;
  size?: number;
  total?: number;
  totalPages?: number;
  orderList?: IPageableOrder[];
};

export type ControlProps = {
  page?: number;
  size?: number;
  total?: number;
  totalPages?: number;
  orderList: IPageableOrder[];
  onSort: (columns?: Column[]) => void;
  setPageable: (pageable: SetPageable) => void;
  onPageChange: (page: number) => void;
};

export type UseGridTableReturn = {
  page?: number;
  size?: number;
  total?: number;
  totalPages?: number;
  control: ControlProps;
  orderList: IPageableOrder[];
  onSort: (columns?: Column[]) => void;
  setPageable: (pageable: SetPageable) => void;
  onPageChange: (page: number) => void;
  pageable: GetPageable;
};

const useGridTable = (props: UseGridTableProps = {}): UseGridTableReturn => {
  const {
    page: pageProp,
    size: sizeProp,
    total: totalProp,
    totalPages: totalPagesProp,
    orderList: orderListProp,
  } = props;
  const [sortColumn, setSortColumn] = useState<Map<string, string>>();
  const [orderList, setOrderList] = useState<IPageableOrder[]>(orderListProp ?? []);
  const [page, setPage] = useState<number>(pageProp ?? 1);
  const [size, setSize] = useState<number>(sizeProp ?? 10);
  const [total, setTotal] = useState<number>(totalProp ?? 0);
  const [totalPages, setTotalPages] = useState<number>(totalPagesProp ?? 0);

  const [pageable, setPageable] = useState<GetPageable>({
    page: page,
    size: size,
    orderList: orderList,
  });

  useEffect(() => {
    const orderListMap: IPageableOrder[] = [];
    if (sortColumn) {
      for (const [key, value] of sortColumn.entries()) {
        if (value) {
          orderListMap.push({
            orderBy: key,
            direction: value,
          });
        }
      }
      setOrderList(orderListMap);
    }
  }, [sortColumn]);

  const onSort = useCallback((columns?: Column[]) => {
    setSortColumn(prev => {
      const newOrderList = new Map(prev);
      columns?.forEach(item => {
        newOrderList.set(item.getColId(), item.getSort() as string);
      });
      return newOrderList;
    });
  }, []);

  const onPageChange = useCallback((page: number) => {
    setPage(page);
    setPageable(prev => {
      return {
        ...prev,
        page: page,
      };
    });
  }, []);

  const onSetPageable = useCallback((pageable: SetPageable) => {
    setPage(pageable.page);
    setSize(pageable.size);
    setTotal(pageable.total);
    setTotalPages(pageable.totalPages);
  }, []);

  return {
    control: {
      page,
      size,
      total,
      totalPages,
      orderList,
      onSort,
      onPageChange,
      setPageable: onSetPageable,
    },
    page,
    size,
    total,
    totalPages,
    orderList,
    onSort,
    setPageable: onSetPageable,
    onPageChange,
    pageable,
  };
};

export default useGridTable;
