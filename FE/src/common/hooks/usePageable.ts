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

export type UseGridTableProps = {
  defaultValues?: {
    page?: number;
    size?: number;
    orderList?: IPageableOrder[];
  };
};

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

const useGridTable = (props: UseGridTableProps = {}): UseGridTableReturn => {
  const { defaultValues } = props;
  const [page, setPage] = useState<number>(defaultValues?.page ?? 1);
  const [size, setSize] = useState<number>(defaultValues?.size ?? 10);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [orderList, setOrderList] = useState<IPageableOrder[]>(defaultValues?.orderList ?? []);

  const [sortColumn, setSortColumn] = useState<Map<string, string>>();
  const [pageable, setPageable] = useState<Pageable>({
    page: page,
    size: size,
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
