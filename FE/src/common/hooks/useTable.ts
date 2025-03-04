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

export type UseTableProps = {
  defaultValues?: {
    page?: number;
    size?: number;
    orderList?: IPageableOrder[];
  };
};

export type ControlProps<T = any> = {
  data?: T[];
  page?: number;
  size?: number;
  total?: number;
  totalPages?: number;
  orderList: IPageableOrder[];
  setData: (data: T[]) => void;
  onSort: (columns?: Column[]) => void;
  setPageable: (pageable: Pageable) => void;
  onPageChange: (page: number) => void;
};

export type UseTableReturn<T = any> = ControlProps<T> & {
  control: ControlProps<T>;
  pageable: Pageable;
};

const useTable = <T = any>(props: UseTableProps = {}): UseTableReturn<T> => {
  const { defaultValues } = props;
  const [data, setData] = useState<T[]>([]);
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
      setOrderList(
        Array.from(sortColumn.entries()).map(([key, value]) => {
          return { orderBy: key, direction: value };
        })
      );
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
      data,
      page,
      size,
      total,
      totalPages,
      orderList,
      setData,
      onSort,
      onPageChange,
      setPageable: onSetPageable,
    },
    data,
    page,
    size,
    total,
    totalPages,
    orderList,
    setData,
    onSort,
    onPageChange,
    setPageable: onSetPageable,
    pageable,
  };
};

export default useTable;
