import { GridApi } from 'ag-grid-community';
import { useCallback, useEffect, useRef, useState } from 'react';

import { IPageableOrder } from '../model/pageable';
import { Pageable, UseTableProps, UseTableReturn } from './types/useTableTypes';

const useTable = <T = any>(props: UseTableProps<T> = {}): UseTableReturn<T> => {
  const { defaultValues } = props;
  const [data, setData] = useState<T[]>(defaultValues?.data ?? []);
  const [page, setPage] = useState<number>(defaultValues?.page ?? 1);
  const [size, setSize] = useState<number>(defaultValues?.size ?? 10);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [orderList, setOrderList] = useState<IPageableOrder[]>(defaultValues?.orderList ?? []);
  const [sortColumn, setSortColumn] = useState<Map<string, string>>();
  const gridApiRef = useRef<GridApi<T> | null>(null);
  const [pageable, setPageable] = useState<Pageable>({
    page: page,
    size: size,
    from: from,
    to: to,
    total: total,
    totalPages: totalPages,
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
  const onSort = useCallback((columnId: string, order: 'asc' | 'desc' | null) => {
    setSortColumn(prev => {
      const newOrderList = new Map(prev);
      newOrderList.set(columnId, order as string);
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
  const onSizeChange = useCallback((size: number) => {
    setPage(1);
    setSize(size);
    setPageable(prev => {
      return {
        ...prev,
        page: 1,
        size: size,
      };
    });
  }, []);

  /**
   *
   */
  const onPageableChange = useCallback((pageable: Pageable) => {
    setPage(pageable.page);
    setSize(pageable.size);
    setFrom(pageable.from);
    setTo(pageable.to);
    setTotal(pageable.total);
    setTotalPages(pageable.totalPages);
  }, []);

  return {
    control: {
      data,
      page,
      size,
      from,
      to,
      total,
      totalPages,
      orderList,
      gridApiRef,
      onDataChange: setData,
      onSort,
      onPageChange,
      onSizeChange,
      onPageableChange,
    },
    data,
    page,
    size,
    from,
    to,
    total,
    totalPages,
    orderList,
    gridApiRef,
    onDataChange: setData,
    onSort,
    onPageChange,
    onSizeChange,
    onPageableChange,
    pageable,
  };
};

export default useTable;
