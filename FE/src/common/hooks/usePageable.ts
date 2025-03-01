import { Column } from 'ag-grid-community';
import { useCallback, useEffect, useState } from 'react';

import { IPageableOrder } from '../model/pageable';

export type Pageable = {
  page: number;
  size: number;
  total: number;
  totalPages: number;
  orderList?: IPageableOrder[];
};

export type UseGridTableProps = Pageable & {};

export type ControlProps = {
  page?: number;
  size?: number;
  total?: number;
  totalPages?: number;
  orderList: IPageableOrder[];
  onSort: (columns?: Column[]) => void;
  setPageable: (pageable: Pageable) => void;
  onPageChange: (page: number) => void;
};

export type UseGridTableReturn = ControlProps & {
  control: ControlProps;
  pageable: Pageable;
};

const useGridTable = (
  props: UseGridTableProps = {
    page: 1,
    size: 2,
    total: 0,
    totalPages: 0,
  }
): UseGridTableReturn => {
  const {
    page: pageProp,
    size: sizeProp,
    total: totalProp,
    totalPages: totalPagesProp,
    orderList: orderListProp,
  } = props;
  const [page, setPage] = useState<number>(pageProp);
  const [size, setSize] = useState<number>(sizeProp);
  const [total, setTotal] = useState<number>(totalProp);
  const [totalPages, setTotalPages] = useState<number>(totalPagesProp);
  const [orderList, setOrderList] = useState<IPageableOrder[]>(orderListProp ?? []);

  const [sortColumn, setSortColumn] = useState<Map<string, string>>();
  const [pageable, setPageable] = useState<Pageable>({
    page: page,
    size: size,
    total: 0,
    totalPages: 0,
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
      setPageable(prev => {
        return {
          ...prev,
          orderList: orderListMap,
        };
      });
    }
  }, [sortColumn]);

  /**
   *
   */
  const onSort = useCallback((columns?: Column[]) => {
    setSortColumn(prev => {
      const newOrderList = new Map(prev);
      columns?.forEach(item => {
        newOrderList.set(item.getColId(), item.getSort() as string);
      });
      return newOrderList;
    });
  }, []);

  /**
   *
   */
  const onPageChange = useCallback((page: number) => {
    setPage(page);
    setPageable(prev => {
      return {
        ...prev,
        page: page,
      };
    });
  }, []);

  /**
   *
   */
  const onSetPageable = useCallback((pageable: Pageable) => {
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
    onPageChange,
    setPageable: onSetPageable,
    pageable,
  };
};

export default useGridTable;
