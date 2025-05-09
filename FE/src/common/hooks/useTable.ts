import { GridApi } from 'ag-grid-community';
import { useCallback, useEffect, useRef, useState } from 'react';

import { IPageableOrder, IPageResponse } from '../model/Pageable';
import { Pageable, PaginationInfo, UseTableProps, UseTableReturn } from './types/useTableTypes';

const useTable = <T = any>(props: UseTableProps<T> = {}): UseTableReturn<T> => {
  const { defaultValues } = props;
  const [data, setData] = useState<T[]>(defaultValues?.data ?? []);
  const [sortColumn, setSortColumn] = useState<Map<string, string>>();
  const [loading, setLoading] = useState<boolean>(false);
  const gridApiRef = useRef<GridApi<T> | null>(null);
  const [pageable, setPageable] = useState<Pageable>({
    page: 1,
    size: 10,
    orderList: [],
  });
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    ...pageable,
    from: 0,
    to: 0,
    total: 0,
    totalPages: 0,
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

  const onDataChange = useCallback(
    (data: T[], pageResponse?: IPageResponse) => {
      setData(data);
      if (pageResponse) {
        setPaginationInfo({ ...pageResponse, orderList: pageable.orderList });
      }
    },
    [pageable.orderList]
  );

  const onSetLoading = useCallback((loading: boolean) => {
    setLoading(loading);
  }, []);

  return {
    control: {
      loading,
      data,
      pageable,
      paginationInfo,
      gridApiRef,
      onDataChange,
      onSort,
      onPageChange,
      onSizeChange,
    },
    pageable,
    gridApiRef,
    onDataChange,
    onSort,
    onPageChange,
    onSizeChange,
    onSetLoading,
  };
};

export default useTable;
