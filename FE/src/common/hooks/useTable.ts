import { GridApi } from 'ag-grid-community';
import { useCallback, useEffect, useRef, useState } from 'react';

import { IPageableOrder } from '../model/pageable';
import { Pageable, UseTableProps, UseTableReturn } from './types/useTableTypes';

const useTable = <T = any>(props: UseTableProps<T> = {}): UseTableReturn<T> => {
  const { defaultValues } = props;
  const [data, setData] = useState<T[]>(defaultValues?.data ?? []);
  const [sortColumn, setSortColumn] = useState<Map<string, string>>();
  const gridApiRef = useRef<GridApi<T> | null>(null);
  const [pageable, setPageable] = useState<Pageable>({
    page: 1,
    size: 10,
    from: 0,
    to: 0,
    total: 0,
    totalPages: 0,
    orderList: [],
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
    setPageable(prev => {
      return {
        ...prev,
        size: size,
      };
    });
  }, []);

  /**
   *
   */
  const onPageableChange = useCallback((pageable: Pageable) => {
    setPageable(pageable);
  }, []);

  return {
    control: {
      data,
      pageable,
      gridApiRef,
      onDataChange: setData,
      onSort,
      onPageChange,
      onSizeChange,
      onPageableChange,
    },
    data,
    pageable,
    gridApiRef,
    onDataChange: setData,
    onSort,
    onPageChange,
    onSizeChange,
    onPageableChange,
  };
};

export default useTable;
